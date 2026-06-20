# 🔖 Semantic Bookmark Search

Search your Chrome bookmarks by **meaning**, not exact text — fully on-device, no account, no server.

You remember the gist ("that article about retry backoff") but not the title, so native keyword search never finds it. This extension embeds your bookmarks with a small language model running entirely in your browser, then ranks them by semantic similarity to your query.

## How it works

- Imports your bookmarks via the Chrome bookmarks API (title + URL + folder).
- Embeds each one with `all-MiniLM-L6-v2` via [transformers.js](https://github.com/huggingface/transformers.js) — in-browser, WASM, no network after the one-time model download.
- Caches embeddings in IndexedDB, so it's instant after the first run.
- Ranks results by cosine similarity; click to open.

**Nothing leaves your machine.** Zero cost, zero accounts, zero telemetry.

## Develop

```bash
npm install
npm run dev          # loads an unpacked dev build into build/chrome-mv3-dev
```

Then load `build/chrome-mv3-dev` via `chrome://extensions` → Developer mode → Load unpacked.

## Build / package for the store

```bash
npm run build        # production build → build/chrome-mv3-prod
npm run package       # zips it for the Chrome Web Store
```

## Install from source (no store needed)

1. `npm install && npm run build`
2. Open `chrome://extensions`, enable **Developer mode** (top-right).
3. **Load unpacked** → select `build/chrome-mv3-prod`.
4. Click the toolbar icon. First open downloads the model once (~30 MB) and indexes your bookmarks with a progress bar; every open after that is instant.

## Privacy

Everything runs **on your device**. Your bookmarks and queries are never sent anywhere. The only network request is a one-time download of the open-source embedding model from the Hugging Face / jsDelivr CDNs, after which it's cached locally. No accounts, no servers, no telemetry.

## Stack

Plasmo (MV3) · React + TypeScript · transformers.js (`all-MiniLM-L6-v2`, quantized) · IndexedDB · Tailwind.

## Roadmap (`later`)

- Embed page **content**, not just titles — the biggest search-quality upgrade.
- Auto-sync on bookmark add/remove (today: manual re-index).
- Bundle the ONNX-runtime WASM locally for a fully offline, store-review-clean build.
- Folder filters, search history, keyboard power-nav.

## License

MIT

