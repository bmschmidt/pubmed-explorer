export const prerender = true;

import { promisify } from 'util';
import { exec as raw_exec } from 'child_process';
const exec = promisify(raw_exec);

async function parse(slug) {
	const command = `pandoc -t json src/scrollership/pubmed.md`;
	const { stdout } = await exec(command);
	return stdout;
}

export async function load({ params }) {
	const { slug } = params;
	const text = await parse(slug);
	return {
		document: JSON.parse(text)
	};
}
