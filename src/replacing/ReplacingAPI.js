import indexedDBPromise from '../indexedDBPromise';

const dbName = "DictionaryReplace";
const dbVersion = 1;
const dictionaryObjectSoreName = "dictionary";
const itemObjectStoreName = "item";

export default {

    openDB() {
        return indexedDBPromise.openDB(dbName, dbVersion, (db) => {
            const dictObjectStore = db.createObjectStore(dictionaryObjectSoreName, { autoIncrement: true });
            dictObjectStore.createIndex("name", "name", { unique: true });

            const itemObjectStore = db.createObjectStore(itemObjectStoreName, { autoIncrement: true });
            itemObjectStore.createIndex("from", "from", { unique: true });
            itemObjectStore.createIndex("to", "to", { unique: false });
        });
    },

    listDictionary() {
        return this.openDB().then(
            db => indexedDBPromise.getAll(db, dictionaryObjectSoreName));
    },

    addDictionary(name) {
        return this.openDB().then(
            db => indexedDBPromise.add(db, dictionaryObjectSoreName, { name }));
    },

    update(dict) {

    },

    delete(id) {

    }
}