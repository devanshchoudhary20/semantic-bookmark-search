import { openDB, type DBSchema, type IDBPDatabase } from "idb"

import type { EmbeddedBookmark } from "~lib/types"

// On-device vector cache. Nothing here ever leaves the browser.
interface SbsDB extends DBSchema {
  embeddings: {
    key: string
    value: EmbeddedBookmark
  }
}

const DB_NAME = "semantic-bookmark-search"
const DB_VERSION = 1

let dbPromise: Promise<IDBPDatabase<SbsDB>> | null = null

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB<SbsDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("embeddings")) {
          db.createObjectStore("embeddings", { keyPath: "id" })
        }
      }
    })
  }
  return dbPromise
}

export async function getAllEmbeddings(): Promise<EmbeddedBookmark[]> {
  const db = await getDB()
  return db.getAll("embeddings")
}

export async function putEmbedding(record: EmbeddedBookmark): Promise<void> {
  const db = await getDB()
  await db.put("embeddings", record)
}

export async function deleteEmbeddings(ids: string[]): Promise<void> {
  if (ids.length === 0) return
  const db = await getDB()
  const tx = db.transaction("embeddings", "readwrite")
  await Promise.all(ids.map((id) => tx.store.delete(id)))
  await tx.done
}

export async function clearEmbeddings(): Promise<void> {
  const db = await getDB()
  await db.clear("embeddings")
}
