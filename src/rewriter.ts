// src/rewriter.ts
// Ensure you have "dom" and "webworker" in your tsconfig.lib entries for HTMLRewriter types.

// Injects the App Launcher overlay script into HTML pages
export function applyHUDRewriter(response: Response): Response {
	const contentType = response.headers.get('Content-Type') || '';
	if (!contentType.includes('text/html')) {
		return response;
	}

	// HTMLRewriter is available globally in the Workers runtime
	return new HTMLRewriter()
		.on('head', {
			element(head) {
				// Inject minimal CSS for the launcher container
				head.append(
					`<style>
            #cf-launcher-container {
              position: fixed;
              bottom: 20px;
              right: 20px;
              z-index: 100000;
            }
          </style>`,
					{ html: true }
				);
			},
		})
		.on('body', {
			element(body) {
				// Create the container for the launcher UI
				body.append(`<div id="cf-launcher-container"></div>`, { html: true });
				// Load the overlay script
				body.append(`<script src="/widgets/app-launcher/overlay.js" defer></script>`, { html: true });
			},
		})
		.transform(response);
}
