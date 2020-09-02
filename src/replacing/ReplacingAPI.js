export default dictionaryService = {
    data: [
        { id: 1, name: 'Project 1' },
        { id: 2, name: 'Project 2' },
        { id: 3, name: 'Project 3' }
    ],

    list() {
        return this.data;
    },

    save(dict) {
        this.data.push(dict);
    },

    update(dict) {
        
    },

    delete(id) {

    }
}