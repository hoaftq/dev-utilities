import React from 'react';
import './Regex.css';

export class Regex extends React.Component {

    constructor() {
        super();

        this.state = {
            regex: null,
            inputString: "",
            replacement: ""
        }

        this.handleRegexChange = this.handleRegexChange.bind(this);
        this.handleInputStringChange = this.handleInputStringChange.bind(this);
        this.handleReplacementChange = this.handleReplacementChange.bind(this);
    }

    handleRegexChange(regex) {
        this.setState({ regex });
    }

    handleInputStringChange(inputString) {
        this.setState({ inputString });
    }

    handleReplacementChange(replacement) {
        this.setState({ replacement });
    }

    render() {
        const { regex, inputString, replacement } = this.state;
        return (
            <div className="regex">
                <div>
                    <RegexPattern onChange={this.handleRegexChange} />
                    <Replacement onChange={this.handleReplacementChange} />
                </div>
                <div>
                    <div className="input-string">
                        <InputString onChange={this.handleInputStringChange} />
                    </div>
                    <div className="maches">
                        <MatchedContent regex={regex} inputString={inputString} />
                    </div>
                    <div className="replaced-string">
                        <ReplacedString regex={regex} inputString={inputString} replacement={replacement} />
                    </div>
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
            flags: flags,
            errorMessage: ""
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
        this.setState({
            errorMessage: ""
        });

        if (!this.state.pattern) {
            this.props.onChange(null);
            return;
        }

        const flags = Object.keys(this.state.flags).reduce(
            (acc, currentValue) => acc + (this.state.flags[currentValue] ? currentValue : ""), ""
        );
        console.log(flags);

        let reg = null;
        try {
            reg = new RegExp(this.state.pattern, flags);
        } catch (e) {
            this.setState({
                errorMessage: e.message
            });
        }
        this.props.onChange(reg);
    }

    render() {
        const flagElements = Object.keys(this.flagDescriptions).map(f => (
            <label key={f}>
                <input type="checkbox" name={f} checked={this.state.flags[f]} onChange={this.handleChange}></input>
                <span className="flag">{f}</span>
                <span className="description">{this.flagDescriptions[f]}</span>
            </label>
        ));
        return (
            <div>
                <label className="title">Regex partern</label>
                <input type="text" name="pattern" value={this.state.pattern} onChange={this.handleChange}></input>
                <div class="regex-error-message">{this.state.errorMessage}</div>
                <div className="flags">
                    {flagElements}
                </div>
            </div>
        );
    }
}

class Replacement extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onChange(e.target.value);
    }

    render() {
        return (
            <div>
                <label className="title">Replacement</label>
                <input type="text" name="replacement" onChange={this.handleChange}></input>
            </div>
        );
    }
}

function InputString(props) {
    return (
        <div className="block">
            <label className="title">Input string</label>
            <textarea type="text"
                className="content"
                name="inputString"
                onChange={(e) => props.onChange(e.target.value)}></textarea>
        </div>
    );
}

class MatchedContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            match: null
        };
    }

    handleMatchClick(match, e) {
        this.setState({
            match
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.regex !== nextProps.regex || this.props.inputString !== nextProps.inputString) {
            this.setState({
                match: null
            });
        }
    }

    render() {
        const { inputString, regex } = this.props;

        const matchedContents = [];
        if (regex) {
            let i = 0, m;
            while ((m = regex.exec(inputString)) !== null) {
                if (m.index > i) {
                    matchedContents.push(inputString.substring(i, m.index));
                }

                matchedContents.push(
                    <span key={m.index} onClick={this.handleMatchClick.bind(this, m)}>
                        {inputString.substr(m.index, m[0].length)}
                    </span>);
                i = m.index + m[0].length;

                if (!regex.global) {
                    break;
                }
            }

            if (i < inputString.length) {
                matchedContents.push(inputString.substring(i));
            }
        }

        let groupContent;
        if (this.state.match) {
            const [match, ...groups] = this.state.match;
            const index = this.state.match.index;
            groupContent = (
                <div>
                    <div className="group">
                        <span className="group-title">Match:</span>
                        <span className="group-info">{match}</span>
                    </div>
                    <div className="group">
                        <span className="group-title">Range:</span>
                        <span className="group-info">{index}</span> - <span className="group-info">{index + match?.length}</span>
                    </div>
                    <div className="group">
                        <span className="group-title">Groups:</span>
                        <ul>
                            {groups.map(g => <li className="group-info">{g}</li>)}
                        </ul>
                    </div>
                </div>)
        };

        return (
            <div className="block">
                <div className="title">Matches</div>
                <div className="content">
                    <div className="matched-content">
                        {matchedContents}
                    </div>
                    <div className="groups">
                        {groupContent}
                    </div>
                </div>
            </div>
        );
    }
}

class ReplacedString extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { regex, inputString, replacement } = this.props;
        let replacedString = "";
        if (regex && inputString) {
            replacedString = inputString.replace(regex, replacement);
        }

        return (
            <div class="block">
                <div className="title">Replaced string</div>
                <div className="content" style={{ overflowY: 'auto' }}>{replacedString}</div>
            </div>
        );
    }
}