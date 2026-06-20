import type { BookmarkRecord } from "~lib/types"

// Flatten the Chrome bookmark tree into embeddable records.
// Only nodes with a URL are real bookmarks; folders just contribute breadcrumb context.
export async function loadBookmarks(): Promise<BookmarkRecord[]> {
  const tree = await chrome.bookmarks.getTree()
  const records: BookmarkRecord[] = []
  walk(tree, [], records)
  return records
}

function walk(
  nodes: chrome.bookmarks.BookmarkTreeNode[],
  trail: string[],
  out: BookmarkRecord[]
) {
  for (const node of nodes) {
    const title = node.title?.trim() ?? ""

    if (node.url) {
      const folder = trail.join(" / ")
      out.push({
        id: node.id,
        title: title || node.url,
        url: node.url,
        folder,
        text: buildEmbedText(title, node.url, folder)
      })
    }

    if (node.children?.length) {
      const nextTrail = title ? [...trail, title] : trail
      walk(node.children, nextTrail, out)
    }
  }
}

// The string the model actually sees. Folder path adds cheap semantic context.
function buildEmbedText(title: string, url: string, folder: string): string {
  const host = safeHost(url)
  return [title, host, folder].filter(Boolean).join(" — ")
}

function safeHost(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return ""
  }
}
