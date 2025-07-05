/* File: src/widgets/app-launcher/overlay.js */
(function () {
	// Load the Cloudflare Access Launcher script
	var launcherScript = document.createElement('script');
	launcherScript.src = 'https://static.cloudflareinsights.com/access-launcher.js';
	launcherScript.async = true;
	launcherScript.onload = initLauncher;
	document.head.appendChild(launcherScript);

	// Create container for the launcher UI
	function createContainer(containerId) {
		var container = document.createElement('div');
		container.id = containerId;
		container.style.position = 'fixed';
		container.style.bottom = '20px';
		container.style.right = '20px';
		container.style.zIndex = 100000;
		document.body.appendChild(container);
		return container;
	}

	// Initialize the Access Launcher once the script is loaded
	function initLauncher() {
		// Fetch config
		fetch('/widgets/app-launcher/config.json')
			.then(function (res) {
				return res.json();
			})
			.then(function (config) {
				// Ensure container exists
				createContainer(config.containerId);

				// Initialize AccessLauncher
				if (window.AccessLauncher) {
					window.AccessLauncher.init({
						container: '#' + config.containerId,
						serviceToken: config.serviceToken,
						accountId: config.accountId,
						apiBase: config.apiBase,
					});
				} else {
					console.error('AccessLauncher script failed to load.');
				}
			})
			.catch(function (err) {
				console.error('Failed to load app-launcher config:', err);
			});
	}
})();
