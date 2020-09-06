export default {
    openDB(dbName, dbVersion, createDBFunc) {
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
                createDBFunc(db);
            };
        });
    },

    getAll(db, objectStoreName, query, count) {
        return new Promise((resolve, reject) => {
            const req = db.transaction(objectStoreName).objectStore(objectStoreName).getAll(query, count);
            req.onsuccess = (event) => {
                resolve(event.target.result);
            };
            req.onerror = (event) => {
                reject(req.error);
            };
        });
    },

    getByKey(db, objectStoreName, key) {
        return new Promise((resolve, reject) => {
            const req = db.transaction(objectStoreName, "readonly").objectStore(objectStoreName).get(key);
            req.onsuccess = (event) => {
                resolve(event.target.result);
            };
            req.onerror = (event) => {
                reject(req.error);
            };
        });
    },

    getByIndex(db, objectStoreName, indexName, indexValue) {
        return new Promise((resolve, reject) => {
            const req = db.transaction(objectStoreName, "readonly").objectStore(objectStoreName).index(indexName).get(indexValue);
            req.onsuccess = (event) => {
                resolve(event.target.result);
            };
            req.onerror = (event) => {
                reject(req.error);
            }
        });
    },

    add(db, objectStoreName, data) {
        return new Promise((resolve, reject) => {
            let added;
            const trans = db.transaction(objectStoreName, "readwrite");
            trans.onsuccess = (event) => {
                resolve(added);
            }
            trans.onerror = (event) => {
                reject(event.target); // TODO
            }
            const objectStore = trans.objectStore(objectStoreName);
            if (Array.isArray(data)) {
                added = [];
                data.forEach(d => {
                    const req = objectStore.add(d);
                    req.onsuccess = (event) => {
                        added.push(event.target.result);
                    }
                });
            } else {
                const req = objectStore.add(data);
                req.onsuccess = (event) => {
                    added = event.target.result;
                }
            }
        });
    }
};