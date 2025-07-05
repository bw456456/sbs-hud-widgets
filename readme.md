# sbs-hud-widgets

A Cloudflare Worker-based framework for injecting persistent HUD widgets across your domain.

## Features
- Edge injection of scripts via HTMLRewriter
- Modular widget structure (`src/widgets/*`)
- Secure Secrets Store integration
- Observability with Analytics Engine, Logpush, and D1 logging
- Asset hosting on R2 (`cdn-sbi`)

## Getting Started

### Prerequisites
- Node.js v16+
- Wrangler CLI (`npm install -g wrangler`)

### Installation
```bash
git clone <repo-url>
cd sbs-hud-widgets
npm install
```

### Configuration
1. Rename `wrangler.jsonc.example` to `wrangler.jsonc`.
2. Update bindings (R2 bucket, D1 database, Secrets Store, account_id).
3. Add `"type": "esm"` to `wrangler.jsonc`.

### Development
- Start local dev server:
  ```bash
  wrangler dev
  ```
- Code lives in `src/`.  
  - `index.ts`: Worker entry  
  - `rewriter.ts`: HTML injection logic  
  - `widgets/app-launcher/`: First widget  

### Building & Deployment
```bash
npm run build
wrangler deploy --env production
```

### Adding New Widgets
1. Create folder under `src/widgets/your-widget/`
2. Add `overlay.js` and `config.json`
3. Update `rewriter.ts` to inject new script

## License
MIT