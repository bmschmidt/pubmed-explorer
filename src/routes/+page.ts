/*
import { redirect } from '@sveltejs/kit';

const pubmed_aliases = new Set([
	'pubmed',
	'pubmed/pubmed',
	'pubmed/pubmed.html',
	'pubmed/index.html',
	'journeys/pubmed.html'
])
export function load({ url }) {
	console.log({url})
	if (pubmed_aliases.has(url.pathname)) {
		throw redirect(301, '/pubmed');
	}
	if (url.hostname.includes('pubmed.nomic.ai')) {
		throw redirect(302, 'https://static.nomic.ai/pubmed');
	}
}
*/