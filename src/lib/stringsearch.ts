import init, { count_regex_matches } from '$lib/wasm_regex/wasm_regex';


export default async function apply_search(query, field, duration = 500, plot, on_find = (d: FindResults) => undefined) {
  await run_search(query, plot, field, on_find);
  if (query === '') {
    return plot.plotAPI({
      duration,
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
        field: `search: (${field}) ${query}`,
        domain: [0, 1],
        range: ['gray', 'orange']
      },
      size: {
        field: `search: (${field}) ${query}`,
        domain: [0, 1],
        range: [1, 2]
      },
      foreground: {
        field: `search: (${field}) ${query}`,
        op: 'eq',
        a: 1
      }
    }
  });

}

export type FindResults = {
  matches: any[],
  tile: any,
  hits: number
}

async function run_search(query, plot, field, on_find = (d : FindResults) => undefined) {
  if (query === '') {
    return;
  }
  await init();
  plot._root.transformations[`search: (${field}) ${query}`] = async function (tile) {
    const data = tile.record_batch.getChild(field).data[0];
    const values = data.values;
    const offsets = data.valueOffsets;
    const matches_in_batches = count_regex_matches(values, offsets, query, true);
    const matches = [];
    let hits = 0;
    for (let i = 0; i < matches_in_batches.length; i++) {
      if (matches_in_batches[i] > 0) {
        matches.push(tile.record_batch.get(i))
        hits += 1
      }
    }
    on_find({matches, tile, hits});
    return matches_in_batches
  };
}
