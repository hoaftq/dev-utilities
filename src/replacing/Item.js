import React from 'react';

export class SearchItems extends React.Component {

    constructor() {
        super();
        this.state = {
            searchTerm: '',
            results: []
        };
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleBlur(e) {
        this.setState({
            searchTerm: e.target.value
        });

        // look up for items here

        this.setState({
            results: [
                { from: 'From 1', to: 'To 1' },
                { from: 'From 2', to: 'To 2' },
            ]
        });
    }

    render() {
        const items = this.state.results.map(e => (
            <tr>
                <td>{e.from}</td>
                <td>{e.to}</td>
                <td><a href="#">Edit</a></td>
                <td><a href="#">Delete</a></td>
            </tr>
        ));
        return (
            <div>
                <select>
                
                </select>
                <input type="text"
                    value={this.searchTerm}
                    onBlur={this.handleBlur}></input>
                <table>
                    {items}
                </table>
            </div>
        );
    }
}

export class NewItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = { from: '', to: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const target = e.target;
        this.setState({
            [target.name]: target.value
        });
    }

    handleSubmit(e) {
        const item = {
            dict: this.props.dictionary,
            from: this.state.from,
            to: this.state.to
        };
        alert(JSON.stringify(item));

        this.setState({
            from: '',
            to: ''
        });
    }

    render() {
        const formStyle = {
            padding: '1em'
        }

        const labelStyle = {
            display: 'block'
        };

        const textStyle = {
            width: '100%',
            height: '2em',
            marginBottom: '1em'
        };

        const buttonStyle = {
            height: '2em'
        };

        return (
            <form style={formStyle} onSubmit={this.handleSubmit}>
                <label for="from" style={labelStyle}>From</label>
                <input type="text"
                    id="from"
                    name="from"
                    value={this.state.from}
                    style={textStyle}
                    onChange={this.handleChange}></input>
                <label for="to" style={labelStyle}>To</label>
                <input type="text"
                    id="to"
                    name="to"
                    value={this.state.to}
                    style={textStyle}
                    onChange={this.handleChange}></input>
                <input type="submit"
                    value="Add"
                    style={buttonStyle}
                    onClick={this.handleAdd}></input>
            </form>
        );
    }
}
