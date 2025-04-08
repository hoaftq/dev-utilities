import React, { createRef } from "react";
import dictionaryReplacingApi from "../dictionaryReplacingApi";
import styles from "./AddDictionary.module.css";

export class AddDictionary extends React.Component {
  dictionaryNameRef = createRef();

  constructor(props) {
    super(props);
    this.state = { dictionaryName: "" };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleDictionaryNameChange =
      this.handleDictionaryNameChange.bind(this);
  }

  handleDictionaryNameChange(e) {
    this.setState({ dictionaryName: e.target.value });
  }

  handleAdd() {
    if (!this.dictionaryNameRef.current.checkValidity()) {
      this.dictionaryNameRef.current.reportValidity();
      return;
    }

    dictionaryReplacingApi
      .addDictionary(this.state.dictionaryName)
      .then((key) => {
        this.props.onAdded(key, this.state.dictionaryName);
        this.setState({ dictionaryName: "" });
      });
  }

  render() {
    return (
      <div className={styles.container}>
        <input
          type="text"
          name="dictionaryName"
          required
          className={styles["dictionary-name"]}
          ref={this.dictionaryNameRef}
          value={this.state.dictionaryName}
          onChange={this.handleDictionaryNameChange}
        />
        <input type="button" value="Add dictionary" onClick={this.handleAdd} />
      </div>
    );
  }
}
