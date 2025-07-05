// src/index.ts
import { applyHUDRewriter } from './rewriter';

export default {
	// the fetch method signature for module workers
	async fetch(request: Request, env: unknown, ctx: ExecutionContext): Promise<Response> {
		// proxy the request
		const response = await fetch(request);
		const ct = response.headers.get('Content-Type') || '';
		// only rewrite HTML
		if (ct.includes('text/html')) {
			return applyHUDRewriter(response);
		}
		return response;
	},
};
