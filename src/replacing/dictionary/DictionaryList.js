import React from "react";

export class DictionaryList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  // componentDidMount() {
  //   dictionaryReplacingApi.listDictionaries().then((dictionaries) =>
  //     this.setState({
  //       dictionaries: dictionaries.map((d) => ({
  //         dictionaryId: d.key,
  //         dictionaryName: d.value.name,
  //       })),
  //     })
  //   );
  // }

  handleChange(event) {
    if (this.props.onSelectDictionary) {
      const selectedDictionary = this.props.dictionaries
        .filter((d) => d.dictionaryId === +event.target.value)
        .at(0);
      this.props.onSelectDictionary(selectedDictionary);
    }
  }

  render() {
    return (
      <>
        <select
          className={this.props.className}
          size={this.props.size}
          value={this.props.selectedDictionaryId}
          onChange={this.handleChange}
        >
          {this.props.dictionaries.map((d) => (
            <option key={d.dictionaryId} value={d.dictionaryId}>
              {d.dictionaryName}
            </option>
          ))}
        </select>
      </>
    );
  }
}
