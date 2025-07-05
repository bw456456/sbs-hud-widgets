# sbs-hud-widgets Development Plan

## 1. Project Overview
- **Name**: sbs-hud-widgets
- **Purpose**: Provide a framework for injecting persistent HUD widgets (e.g., Cloudflare Zero Trust Application Launcher) across all pages.
- **Hosting**: Cloudflare Worker at `widgets.your-domain.com`, serving assets from R2 bucket `cdn-sbi`.

## 2. Goals
- Modular, versioned widget loading
- Easy integration via GTM or edge injection
- Secure secret management (Secrets Store)
- Observability (Analytics Engine, Logpush, D1 logging)

## 3. Architecture
```
sbs-hud-widgets/
├── wrangler.jsonc          # Cloudflare Worker config
├── src/
│   ├── index.ts            # ESM Worker entry (export default.fetch)
│   ├── rewriter.ts         # HTMLRewriter logic
│   └── widgets/
│       └── app-launcher/
│           ├── overlay.js  # Widget bootstrap script
│           └── config.json # Widget configuration
├── scripts/
│   └── deploy.sh           # Optional cache invalidation
├── package.json            # npm config & scripts
├── tsconfig.json           # TypeScript settings
└── README.md               # Project README
```

## 4. Wrangler Configuration
- **Type**: ES Module Worker (`"type": "esm"`)
- **Bindings**:
  - `CDN_SBI` (R2 bucket)
  - `SBI_LOG_DB` (D1)
  - `SECRETS` (Secrets Store)
  - `WORKERS_ANALYTICS_ENGINE` (Analytics Engine)
- **Routes**: `widgets.your-domain.com/*`

## 5. Development Steps
1. **Environment Setup**
   - Install Wrangler: `npm install -g wrangler@latest`
   - Authenticate: `wrangler login`
2. **Bootstrap Worker**
   - `wrangler init --template worker .`
   - Rename `wrangler.toml` to `wrangler.jsonc`
   - Add `"type": "esm"` and all bindings
3. **Implement HTML Rewriter**
   - In `src/rewriter.ts`, create `applyHUDRewriter(response: Response)`.
   - Inject `<script src="/widgets/app-launcher/overlay.js" defer></script>` and `<div id="cf-launcher"></div>`.
4. **Write Overlay Script**
   - In `src/widgets/app-launcher/overlay.js`, load Access Launcher embed and initialize with config.
   - Create `config.json` for tokens and IDs.
5. **Local Testing**
   - `wrangler dev`
   - Validate script injection on sample HTML.
6. **Deploy**
   - `npm run build`
   - `wrangler deploy --env production`
   - Optionally run `scripts/deploy.sh` to invalidate cache.
7. **Integration**
   - Add GTM Custom HTML tag to load `overlay.js`.
   - Verify on domain pages.

## 6. Next Iterations
- Add more widgets under `src/widgets/`
- Integrate Durable Objects for real-time features
- CI/CD via GitHub Actions
- Monitoring dashboards in Compass