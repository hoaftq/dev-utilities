import React from 'react';

export class DictionaryReplace extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div style={{ display: "grid", gridTemplateColumns: '1fr 3fr' }}>
                <div>
                    <Link to="/dictionary" >Dictionary</Link>
                    <Link to="/"></Link>
                </div>
                <div>
                    <DictionaryList dictionaries={this.state.dictionaries} />
                    <AddDictionary onAdded={this.handleAdded} />
                </div>
            </div>
        );
    }
}