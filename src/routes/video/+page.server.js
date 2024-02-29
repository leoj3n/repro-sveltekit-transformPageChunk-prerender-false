// use edge runtime, instead of node
export const config = {
	runtime: 'edge'
};

// server render on-demand, instead of on-deploy
export const prerender = false; // <= FAILS... "Using @sveltejs/adapter-vercel ✘ [ERROR] Could not resolve "url" [...snip...] Error: Bundling with esbuild failed with 19 errors"
// export const prerender = true; // <= SUCCEEDS... "Using @sveltejs/adapter-vercel ✔ done"

// pre-render only the application shell
// export const ssr = false; // <= Doesn't seem to affect anything either way.
