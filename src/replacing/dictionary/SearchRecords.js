import React from "react";
import dictionaryReplacingApi from "../dictionaryReplacingApi";

export class SearchRecords extends React.Component {
  constructor() {
    super();
    this.state = {
      records: [],
    };
  }

  componentDidMount() {
    dictionaryReplacingApi
      .getAllRecords(this.props.dictionaryId)
      .then((records) => this.setState({ records }));
  }

  render() {
    const items = this.state.records.map((r) => (
      <tr>
        <td>{r.value.from}</td>
        <td>{r.value.to}</td>
      </tr>
    ));
    return (
      <div>
        <table>{items}</table>
      </div>
    );
  }
}
