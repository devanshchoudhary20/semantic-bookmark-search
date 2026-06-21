# Chrome Web Store — Listing Copy

Paste-ready copy for the [Developer Dashboard](https://chrome.google.com/webstore/devconsole). One-time $5 developer registration required.

---

## Name (max 75 chars)

```
Semantic Bookmark Search — find by meaning
```

## Summary (max 132 chars)

```
Search your bookmarks by meaning, not exact words. 100% on-device — no account, no server, nothing ever leaves your browser.
```

## Category

`Productivity`

## Language

`English`

---

## Description (max 16,000 chars)

```
Ever bookmark something, then never find it again? Chrome's bookmark search only matches exact text — so when you remember the idea ("that article about retry backoff") but not the title, it's gone.

Semantic Bookmark Search fixes that. It understands what your bookmarks are ABOUT, so you can search the way you actually remember things.

★ SEARCH BY MEANING
Type "css grid tutorial" and it finds the bookmark even if the title says "A Complete Guide to Layout." Describe the idea in your own words — it ranks your bookmarks by how closely they match.

★ 100% ON YOUR DEVICE
A small language model runs entirely inside your browser. Your bookmarks and your searches never get sent anywhere. No account. No server. No tracking. No telemetry.

★ PRIVATE BY DESIGN
The extension makes zero network requests — the embedding model and runtime are bundled inside it. It works fully offline, and declares no host permissions at all.

★ FAST AFTER FIRST RUN
Your bookmarks are indexed once (with a progress bar) and cached on-device. Every search after that is instant. Hit "Re-index" anytime to pick up new bookmarks.

★ FREE & OPEN SOURCE
No subscription, no paywall, no "pro" upsell. MIT-licensed. Source code is public on GitHub.

— HOW IT WORKS —
Click the toolbar icon, let it index your bookmarks once, then type what you're looking for. Results are ranked by meaning; click any result to open it.

— GOOD TO KNOW —
v1 searches by bookmark title, site, and folder. Embedding full page content is on the roadmap for even sharper results.

Open source: https://github.com/devanshchoudhary20/semantic-bookmark-search
```

---

## Single purpose (required field)

```
This extension has one purpose: to let users search their own browser bookmarks by semantic meaning instead of exact keywords, using a language model that runs entirely on the user's device.
```

---

## Permission justifications (required, per-permission)

`**bookmarks**`

```
Read-only access to the user's bookmarks is the core function — the extension imports bookmark titles, URLs, and folder names to build an on-device search index. Bookmarks are never modified, deleted, or transmitted off the device.
```

`**storage**`

```
Used to cache the computed embedding vectors in the browser (IndexedDB) so the index is built only once and subsequent searches are instant. Stored entirely on the user's device.
```

`**tabs**`

```
Used only to open a bookmark in a new tab when the user clicks a search result. No tab content or browsing activity is read.
```

`**favicon**`

```
Used to display each bookmark's site icon next to its title, read from the browser's local favicon store. No network requests are made for icons.
```

**Host permissions**

```
None. The extension declares no host permissions and makes no network requests — the embedding model and WebAssembly runtime are bundled inside the package. Nothing is ever sent to any server.
```

---

## Privacy practices (Data usage disclosures)

- **Does this item collect or use user data?** No.
- **Personally identifiable information:** Not collected.
- **Health / financial / authentication / personal communications / location / web history / user activity:** Not collected.
- Check all three compliance certifications:
  - ☑ I do not sell or transfer user data to third parties (outside approved use cases).
  - ☑ I do not use or transfer user data for purposes unrelated to my item's single purpose.
  - ☑ I do not use or transfer user data to determine creditworthiness or for lending.

**Privacy policy URL** (required even when no data is collected — point it at the repo's privacy section):

```
https://github.com/devanshchoudhary20/semantic-bookmark-search#privacy
```

---

## Visual assets checklist


| Asset              | Required | Size                    | Notes                                                     |
| ------------------ | -------- | ----------------------- | --------------------------------------------------------- |
| Store icon         | ✅        | 128×128 PNG             | Generated from `assets/icon.svg` (indigo bookmark + lens) |
| Screenshot(s)      | ✅ (1–5)  | 1280×800 or 640×400 PNG | See shot list below                                       |
| Small promo tile   | optional | 440×280 PNG             | Icon + tagline on indigo                                  |
| Marquee promo tile | optional | 1400×560 PNG            | Only if featured                                          |


### Screenshot shot list (capture 3)

1. **Results state** — a natural-language query (e.g. "article about retry backoff") with ranked results, favicons, and match-% pills.
2. **Browse state** — the default view with the full "All bookmarks" list (favicons + titles), showing the popup is useful on open.
3. **First-run indexing** — the progress bar mid-index ("Indexing 142 / 1024 embedded").

> Tip: add a thin caption bar to each screenshot ("Search by meaning", "Runs 100% on-device", "Instant after first run") — captioned screenshots convert far better in the store.

---

## Pre-submission checklist

- Fully offline — ONNX runtime **and** model weights bundled; no host permissions, no remote code (the #1 store-review risk, eliminated).
- `npm run build` is clean; tested via Load unpacked in a real Chrome profile with real bookmarks.
- 128×128 store icon exported (from `assets/icon.svg`).
- 3 screenshots captured at 1280×800.
- Privacy policy section reachable at the URL above.
- Zip uploaded: `cd dist && zip -r ../semantic-bookmark-search.zip .`

```

```

