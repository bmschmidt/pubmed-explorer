This page is a collaboration between the [Berens lab at the University
of Tübingen](http://www.eye-tuebingen.de/berenslab) and
[Nomic](http://nomic.ai). It presents an online companion to the paper
circulated as [The landscape of biomedical
research](https://doi.org/10.1101/2023.04.10.536208), by Rita
Gonzalez-Marquez, Luca Schmidt, Benjamin M. Schmidt, Philipp Berens, and
Dmitry Kobak.

Gonzalez-Marquez, B. Schmidt, and Kobak prepared the online version:
underlying code is at <https://github.com/bmschmidt/pubmed-explorer>

Code for processing the data here and arranging it in two dimensions is
at <https://github.com/berenslab/pubmed-landscape> The visualization
engine to display points is
[Deepscatter](https://github.com/nomic-ai/deepscatter), and
[pandoc-svelte-components](https://www.npmjs.com/package/pandoc-svelte-components)
is used to create a scrollable narration from [the underlying Markdown
file.](https://raw.githubusercontent.com/bmschmidt/pubmed-explorer/main/src/scrollership/pubmed.md)

-----

# Make your own deepscatter scrolly. (N.B. this inherits the deepscatter non-commercial license.)

1. Fork this repo.
2. Install pandoc 2.19 on your local machine.
3. `pip install quadfeather` and use it to create a directory of feather tiles for deepscatter.
Fork and clone https://github.com/bmschmidt/pubmed-explorer/
10:32
2. Install pandoc 2.19 on your local machine.
3. `pip install quadfeather` and use it to create a directory of feather tiles for deepscatter.
10:35
4. Place those files in the explorer repo or somewhere else. (I almost always use a separate https server for tiles. I have a dozen or so sets folder at `~/scrolly_tiles/pubmed` , `~/scrolly_tiles/hathi`, etc.; and then after using `npm i --global http-server` I run `http-server --cors . --port 9999` in that folder.
5. Open the narrative at `src/scrollership/pubmed.md`. Set the tile location in the first `api` block as http://localhost:9999/pubmed.
6. `npm i` and `npm run dev` in the pubmed-explorer repository folder. Editing the file at `src/scrollership/pubmed.md` will change the website. Each of the code blocks is a deepscatter API call expressed as yaml.
7. You just refresh the page at localhost:2001 (I think that’s the port it takes over?) and the site will express the local changes in the markdown file. No javascript coding needed.

At some point soon it will become possible to compile pandoc to run on the web using the new wasm backend for the GHC. This will be really fun and make it possible to radically streamline this process.


