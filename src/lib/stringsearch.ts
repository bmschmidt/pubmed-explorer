export default async function apply_search(query, duration = 500, plot) {
  await run_search(query, plot);
  if (query === '') {
    return plot.plotAPI({
      duration,
      alpha: 50,
      encoding: {
        filter: null,
        color: {
          constant: 'orange'
        },
        size: {
          constant: 1
        },
        foreground: null
      }
    });
  } 
  return plot.plotAPI({
    duration,
    alpha: 50,
    encoding: {
      filter: null,
      color: {
        field: 'search: ' + query,
        domain: [0, 1],
        range: ['gray', 'orange']
      },
      size: {
        field: 'search: ' + query,
        domain: [0, 1],
        range: [1, 2]
      },
      foreground: {
        field: 'search: ' + query,
        op: 'eq',
        a: 1
      }
    }
  });

}

function encode_string(searchterm) {
  const arr = new Uint8Array(128);
  const encoder = new TextEncoder();
  encoder.encodeInto(searchterm, arr);
  return arr;
}

async function run_search(query, plot) {
  if (query === '') {
    return;
  }
  plot._root.transformations['search: ' + query] = async function (tile) {
    // First ensure it exists in duckdb.
    const encoded = encode_string(query);
    await tile.promise;
    const data = tile.record_batch.getChild('title').data[0];
    let match_start = 0;
    let match_length = 0;
    // The first zero in the buffer
    const target_length = encoded.findIndex((d) => d === 0);
    const matches = [];
    for (let i = 0; i < data.values.length; i++) {
      if (data.values[i] === encoded[match_length]) {
        match_length += 1;
        if (match_length === 1) {
          match_start = i;
        }
        if (match_length === target_length) {
          matches.push(match_start);
          match_length = 0;
        }
      } else {
        if (match_length > 0) {
          match_length = 0;
        }
      }
    }
    const output = new Float32Array(tile.record_batch.numRows);
    let offsets_index = 0;
    while (matches.length > 0) {
      const searching = matches.shift();
      while (data.valueOffsets[offsets_index + 1] < searching) {
        offsets_index += 1;
      }
      output[offsets_index] = 1;
    }
    return output;
  };
}
