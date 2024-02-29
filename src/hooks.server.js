// ./src/hooks.server.ts
import { building } from '$app/environment';

const minification_options = {
	collapseBooleanAttributes: true,
	collapseWhitespace: true,
	conservativeCollapse: true,
	decodeEntities: true,
	html5: true,
	ignoreCustomComments: [/^#/],
	minifyCSS: true,
	minifyJS: true,
	removeAttributeQuotes: true,
	removeComments: false, // some hydration code needs comments, so leave them in
	removeOptionalTags: true,
	removeRedundantAttributes: true,
	removeScriptTypeAttributes: true,
	removeStyleLinkTypeAttributes: true,
	sortAttributes: true,
	sortClassName: true
};

/** @type {import('@sveltejs/kit').Handle} */
async function minify_handle({ event, resolve }) {
	let page = '';

	return resolve(event, {
		transformPageChunk: async ({ html, done }) => {
			page += html;
			if (done) {
				if (building) { // <= SEEMS like prerender = false should totally skip this?
					const minify = (await import('html-minifier-terser')).minify;
					return minify(page, minification_options);
				} else {
					return page;
				}
			}
		}
	});
}

export const handle = minify_handle;
