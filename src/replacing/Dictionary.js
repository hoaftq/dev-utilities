import React from 'react';
import replacingAPI from './ReplacingAPI';

export class Dictionary extends React.Component {

    constructor() {
        super();
        this.addDictionary = this.addDictionary.bind(this);
        this.i = 1;
    }

    addDictionary() {
        replacingAPI.addDictionary("Dictonary " + this.i++).then(
            v => {
                alert(JSON.stringify(v));
            }
        );
    }

    render() {
        return (
            <div>
                <DictionaryList />
                <AddDictionary />
                <button type="button" onClick={this.addDictionary}>Add dictionary</button>
            </div>
        );
    }
}


class DictionaryList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dictionaries: []
        };
    }

    componentDidMount() {
        replacingAPI.listDictionary().then(
            (dictionaries) => { this.setState({ dictionaries }); }
        )
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.dictionaries.map(d => <li>{d.name}</li>)}
                </ul>
            </div>
        );
    }
}

class AddDictionary extends React.Component {
    // constructor() {
    // }

    render() {
        return (
            <div>
                <input type="text" name="dictionaryName"></input>
                <input type="button" value="Add"></input>
            </div>
        );
    }
}

class UpdateDictionary extends React.Component {
    constructor() {

    }

    render() {
        return null;
    }
}