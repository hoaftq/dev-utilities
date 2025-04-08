const indexedDBUtils = {
  openDB(dbName, dbVersion, upgradeDbFunc) {
    return new Promise((resolve, reject) => {
      let req = indexedDB.open(dbName, dbVersion);
      req.onsuccess = (event) => {
        const db = event.target.result;
        resolve(db);
      };
      req.onerror = (event) => {
        reject(req.error);
      };
      req.onupgradeneeded = (event) => {
        const db = event.target.result;
        upgradeDbFunc(db);
      };
    });
  },

  add(db, objectStoreName, data) {
    return new Promise((resolve, reject) => {
      const addedKeys = [];
      const transaction = db.transaction(objectStoreName, "readwrite");

      transaction.oncomplete = (event) => {
        resolve(addedKeys);
      };

      transaction.onerror = (event) => {
        reject(event.target); // TODO
      };

      const objectStore = transaction.objectStore(objectStoreName);
      if (Array.isArray(data)) {
        data.forEach((d) => {
          const request = objectStore.add(d);
          request.onsuccess = (event) => {
            addedKeys.push(event.target.result);
          };
        });
      } else {
        const request = objectStore.add(data);
        request.onsuccess = (event) => {
          addedKeys.push(event.target.result);
        };
      }
    });
  },

  getAll(db, objectStoreName, query, count) {
    return new Promise((resolve, reject) => {
      const objectStore = db
        .transaction([objectStoreName], "readonly")
        .objectStore(objectStoreName);

      const requestAll = objectStore.getAll(query, count);

      requestAll.onsuccess = (event) => {
        const requestAllKeys = objectStore.getAllKeys();
        requestAllKeys.onsuccess = (keysEvent) => {
          const values = event.target.result;
          const keys = keysEvent.target.result;
          resolve(
            keys.map((k, i) => ({
              key: k,
              value: values[i],
            }))
          );
        };
        requestAllKeys.onerror = (keysEvent) => {
          reject(requestAllKeys.error);
        };
      };
      requestAll.onerror = (event) => {
        reject(requestAll.error);
      };
    });
  },

  getAllByIndex(db, objectStoreName, indexName, query, direction) {
    return new Promise((resolve, reject) => {
      const cursorRequest = db
        .transaction([objectStoreName], "readonly")
        .objectStore(objectStoreName)
        .index(indexName)
        .openCursor(query, direction);
      const records = [];

      cursorRequest.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          records.push({
            key: cursor.key,
            value: cursor.value,
          });
          cursor.continue();
        } else {
          resolve(records);
        }
      };

      cursorRequest.onerror = (event) => {
        reject();
      };
    });
  },

  getByKey(db, objectStoreName, key) {
    return new Promise((resolve, reject) => {
      const request = db
        .transaction([objectStoreName], "readonly")
        .objectStore(objectStoreName)
        .get(key);

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
      request.onerror = (event) => {
        reject(request.error);
      };
    });
  },

  getByIndex(db, objectStoreName, indexName, indexValue) {
    return new Promise((resolve, reject) => {
      const request = db
        .transaction([objectStoreName], "readonly")
        .objectStore(objectStoreName)
        .index(indexName)
        .get(indexValue);

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
      request.onerror = (event) => {
        reject(request.error);
      };
    });
  },

  update(db, objectStoreName, key, data) {
    return new Promise((resolve, reject) => {
      const objectStore = db
        .transaction(objectStoreName, "readwrite")
        .objectStore(objectStoreName);

      const requestGet = objectStore.get(key);

      requestGet.onsuccess = (event) => {
        const currentData = event.target.result;
        const newData = {
          ...currentData,
          ...data,
        };
        const requestUpdate = objectStore.put(newData);
        requestUpdate.onsuccess = (event) => {
          resolve(data);
        };

        requestUpdate.onerror = (event) => {
          reject(event); // TODO
        };
      };

      requestGet.onerror = (event) => {
        reject(event); // TODO
      };
    });
  },

  delete(db, objectStoreName, key) {
    return new Promise((resolve, reject) => {
      const request = db
        .transaction([objectStoreName], "readwrite")
        .objectStore(objectStoreName)
        .delete(key);

      request.onsuccess = (event) => {
        resolve(key);
      };

      request.onerror = (event) => {
        reject(event.target); // TODO
      };
    });
  },
};

export default indexedDBUtils;
