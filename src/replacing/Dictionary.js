import React from 'react';
import replacingAPI from './ReplacingAPI';

export class Dictionary extends React.Component {

    constructor() {
        super();

        this.state = { dictionaries: [] };

        this.handleAdded = this.handleAdded.bind(this);
    }

    componentDidMount() {
        replacingAPI.listDictionary().then(
            (dictionaries) => { this.setState({ dictionaries }); }
        )
    }

    handleAdded() {
    }

    render() {
        return (
            <div>
                <DictionaryList dictionaries={this.state.dictionaries} />
                <AddDictionary onAdded={this.handleAdded} />
            </div>
        );
    }
}


class DictionaryList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ul>
                    {this.props.dictionaries.map(d => <li>{d.name}</li>)}
                </ul>
            </div>
        );
    }
}

class AddDictionary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { dictionaryName: "", errorMessage: "" };
        this.handleAdd = this.handleAdd.bind(this);
        this.handleDictionaryNameChange = this.handleDictionaryNameChange.bind(this);
    }

    validate() {
        this.setState({ errorMessage: "" });

        if (!this.state.dictionaryName) {
            this.setState({ errorMessage: "Dictionary is required" });
            return false;
        }

        return true;
    }

    handleDictionaryNameChange(e) {
        const target = e.target;
        this.setState({
            dictionaryName: target.value
        }, () => {
            this.validate(target.value);
        });
    }

    handleAdd() {
        if (this.validate()) {
            replacingAPI.addDictionary(this.state.dictionaryName).then(key => {
                this.props.onAdded(key, this.state.dictionaryName);
            });
        }
    }

    render() {
        return (
            <div>
                <div style={{ color: 'red' }}>{this.state.errorMessage}</div>
                <input type="text" name="dictionaryName" value={this.state.dictionaryName} onChange={this.handleDictionaryNameChange}></input>
                <input type="button" value="Add" onClick={this.handleAdd}></input>
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