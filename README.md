# Pubmed Explorer



Building requires pandoc and may be finicky. The core narrative lives at [`/src/scrollership/pubmed.md`](https://github.com/bmschmidt/pubmed-explorer/blob/main/src/scrollership/pubmed.md) and can be edited--later builds will be pushed.

Building
--------

`npm run publish` builds the page and pushes it static.nomic.ai.

Developing
----------

To run the page locally, you need [node](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and [pandoc](https://pandoc.org/installing.html) installed and in your path. Any version of node should be fine; I have pandoc 2.19.2, and things very far off from that may create problems.

With those, run:

```sh
git clone github.com/bmschmidt/pubmed-explorer
cd pubmed-explorer
npm i
npm run dev
```

This should start a webserver with our page at `http://localhost:2001/pubmed`. 

Edits to the markdown file at `src/scrollership/pubmed.md` will be reflected in the content of this page.

The big challenge here is that the tiles with points themselves may not load--rather than pull from the web I have some code that serves them locally. I think I've set it up so that code won't run on other people's computers.
