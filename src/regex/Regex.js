import React from 'react';
import './Regex.css';

export class Regex extends React.Component {

    constructor() {
        super();

        this.state = {
            inputString: "",
            regex: null
        }

        this.handlePatternChange = this.handlePatternChange.bind(this);
        this.handleInputStringChange = this.handleInputStringChange.bind(this);
    }

    handlePatternChange(reg) {
        this.setState({ regex: reg });
    }

    handleInputStringChange(e) {
        this.setState({ inputString: e.target.value });
    }

    render() {
        return (
            <div className="regex">
                <div>
                    <RegexPattern onChange={this.handlePatternChange} />
                    <Replacement />
                </div>
                <div>
                    <label className="title">Input string</label>
                    <textarea type="text"
                        className="content"
                        name="inputString"
                        onChange={this.handleInputStringChange}></textarea>
                    <label className="title">Matching</label>
                    <div className="content" style={{ border: '1px solid lightblue', padding: 5 }}>
                        <MatchedContent inputString={this.state.inputString} regex={this.state.regex} />
                    </div>
                    <label className="title">Replaced string</label>
                    <textarea type="text" className="content" readOnly="true"></textarea>
                </div>
            </div>
        );
    }
}

class RegexPattern extends React.Component {

    flagDescriptions = {
        g: 'Global search',
        i: 'Case insensitive search',
        m: 'Multi-line search',
        s: 'Allows . to match newline characters',
        u: '"unicode"; treat a pattern as a sequence of unicode code points',
        y: 'Perform a "sticky" search that matches starting at the current position in the target string'
    };

    constructor(props) {
        super(props);

        const flags = {};
        for (const f in this.flagDescriptions) {
            flags[f] = false;
        }

        this.state = {
            pattern: "",
            flags: flags
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const target = e.target;
        if (target.type === "checkbox") {
            this.setState((state) => ({
                flags: { ...state.flags, [target.name]: target.checked }
            }), () => {
                console.log(JSON.stringify(this.state));
                this.createNewRegex();
            });
        } else {
            this.setState({
                pattern: target.value
            }, () => {
                this.createNewRegex();
            });
        }
    }

    createNewRegex() {
        if (!this.state.pattern) {
            return;
        }

        const flags = Object.keys(this.state.flags).reduce(
            (acc, currentValue) => acc + (this.state.flags[currentValue] ? currentValue : ""), ""
        );
        console.log(flags);

        const reg = new RegExp(this.state.pattern, flags);
        this.props.onChange(reg);
    }

    render() {
        const flagElements = Object.keys(this.flagDescriptions).map(f => (
            <label>
                <input type="checkbox"
                    name={f}
                    checked={this.state.flags[f]}
                    onChange={this.handleChange}></input>
                <span className="flag">{f}</span>
                <span className="description">{this.flagDescriptions[f]}</span>
            </label>
        ));
        return (
            <div>
                <label className="title">Regex partern</label>
                <input type="text" value={this.state.pattern} onChange={this.handleChange}></input>
                <div className="options">
                    {flagElements}
                </div>
            </div>
        );
    }
}

class Replacement extends React.Component {
    render() {
        return (
            <div>
                <label className="title">Replacement</label>
                <input type="text" name="replacement"></input>
            </div>
        );
    }
}

class MatchedContent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { inputString, regex } = this.props;

        const contents = [];
        if (regex && regex.global) {
            let i = 0, m;
            while ((m = regex.exec(inputString)) !== null) {
                if (m.index > i) {
                    contents.push(inputString.substring(i, m.index));
                }
                contents.push(<span>{inputString.substr(m.index, m[0].length)}</span>);
                i = m.index + m[0].length;
            }

            if (i < inputString.length) {
                contents.push(inputString.substring(i));
            }
        } else {
            contents.push(inputString);
        }

        return (
            <div className="matched-content" style={{ width: '100%', height: '100%' }}>
                {contents}
            </div>
        );
    }

}