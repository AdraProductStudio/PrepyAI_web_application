import { initializeDB } from "Components/CustomHooks"

export function IndexedDbDeleteFun() {
  return new Promise((resolve, reject) => {
    const deleteRequest = indexedDB.deleteDatabase(process.env.REACT_APP_INDEXEDDB_DATABASE_NAME)

    deleteRequest.onsuccess = () => {
      // console.log("Database deleted successfully")
      resolve(true)
    }

    deleteRequest.onerror = (event) => {
      // console.error("Failed to delete IndexedDB:", event)
      reject(event)
    }

    deleteRequest.onblocked = async () => {
      console.warn("Database deletion blocked. Falling back to clear().")

      try {
        const db = await initializeDB(
          process.env.REACT_APP_INDEXEDDB_DATABASE_NAME,
          process.env.REACT_APP_INDEXEDDB_DATABASE_VERSION,
          process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME
        )

        const transaction = db.transaction(
          process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME,
          "readwrite"
        )
        const store = transaction.objectStore(process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME)

        const clearRequest = store.clear()

        clearRequest.onsuccess = () => {
          // console.log("Object store cleared successfully (fallback).")
          db.close()  
          resolve(true)
        }

        clearRequest.onerror = (err) => {
          // console.error("Failed to clear object store:", err)
          db.close()  
          reject(err)
        }
      } catch (err) {
        // console.error("Fallback clear() failed:", err)
        reject(err)
      }
    }
  })
}
