import React from "react";
import { Link } from "react-router-dom";
import { DictionaryList } from "./dictionary/DictionaryList";
import styles from "./DictionaryReplace.module.css";
import dictionaryReplacingApi from "./dictionaryReplacingApi";

export class DictionaryReplace extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dictionaries: [],
      selectedDictionaryId: null,
      text: "",
      translatedText: "",
    };

    this.handleDictionaryChange = this.handleDictionaryChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    dictionaryReplacingApi.getAllDictionaries().then((dictionaries) => {
      this.setState((prevState) => ({
        ...prevState,
        dictionaries,
        selectedDictionaryId: dictionaries?.[0].dictionaryId,
      }));
    });
  }

  async handleDictionaryChange(event) {
    const translatedText = await this.translate(
      event.dictionaryId,
      this.state.text
    );
    this.setState((prevState) => ({
      ...prevState,
      selectedDictionaryId: event.dictionaryId,
      translatedText,
    }));
  }

  async handleInputChange(event) {
    const text = event.target.value;
    const translatedText = await this.translate(
      this.state.selectedDictionaryId,
      text
    );
    this.setState((prevState) => ({
      ...prevState,
      text,
      translatedText,
    }));
  }

  async translate(dictionaryId, text) {
    const records = await dictionaryReplacingApi.getAllRecords(dictionaryId);
    const sortedRecords = records.sort(
      (r1, r2) => r1.value.length - r2.value.length
    );
    let translatedText = text;
    for (let r of sortedRecords) {
      translatedText = translatedText.replaceAll(r.value.from, r.value.to);
    }

    return translatedText;
  }

  render() {
    return (
      <div className={styles.content}>
        <div>
          <DictionaryList
            className={styles.dictionary}
            dictionaries={this.state.dictionaries}
            onSelectDictionary={this.handleDictionaryChange}
          />
          <Link to="/dictionary">Manage dictionaries</Link>
        </div>
        <textarea
          rows={10}
          value={this.state.text}
          onChange={this.handleInputChange}
        />
        <textarea rows={10} value={this.state.translatedText} readOnly />
      </div>
    );
  }
}
