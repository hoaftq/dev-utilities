import indexedDBUtils from "../indexedDBUtils";

const dbName = "DictionaryReplace";
const dbVersion = 1;
const dictionaryObjectSoreName = "dictionary";
const recordObjectStoreName = "record";

let db;
function openDB() {
  return indexedDBUtils.openDB(dbName, dbVersion, (db) => {
    const dictObjectStore = db.createObjectStore(dictionaryObjectSoreName, {
      autoIncrement: true,
    });
    dictObjectStore.createIndex("name", "name", { unique: true });

    const recordObjectStore = db.createObjectStore(recordObjectStoreName, {
      autoIncrement: true,
    });

    recordObjectStore.createIndex("dictionaryId", "dictionaryId", {
      unique: false,
    });
    recordObjectStore.createIndex("from", "from", { unique: true });
    recordObjectStore.createIndex("to", "to", { unique: false });
  });
}

async function getDB() {
  if (!db) {
    db = await openDB();
  }

  return db;
}

const dictionaryReplacingApi = {
  async getAllDictionaries() {
    const db = await getDB();
    const dictionaries = await indexedDBUtils.getAll(
      db,
      dictionaryObjectSoreName
    );
    return dictionaries.map((d) => ({
      dictionaryId: d.key,
      dictionaryName: d.value.name,
    }));
  },

  async addDictionary(name) {
    const db = await getDB();
    return await indexedDBUtils.add(db, dictionaryObjectSoreName, { name });
  },

  async addRecord(record) {
    const db = await getDB();
    return await indexedDBUtils.add(db, recordObjectStoreName, record);
  },

  async getAllRecords(dictionaryId) {
    const db = await getDB();
    return await indexedDBUtils.getAllByIndex(
      db,
      recordObjectStoreName,
      "dictionaryId",
      IDBKeyRange.only(dictionaryId)
    );
  },
};

export default dictionaryReplacingApi;
