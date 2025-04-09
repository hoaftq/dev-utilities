import React from "react";
import dictionaryReplacingApi from "../dictionaryReplacingApi";
import { DictionaryList } from "./DictionaryList";
import { AddDictionary } from "./AddDictionary";
import { SearchRecords } from "./SearchRecords";
import { AddNewRecord } from "./AddNewRecord";

import styles from "./Dictionary.module.css";

export class Dictionary extends React.Component {
  constructor() {
    super();

    this.state = {
      dictionaries: [],
      selectedDictionaryId: null,
      addedRecordKeys: [],
    };

    this.handleSelectDictionary = this.handleSelectDictionary.bind(this);
    this.handleAdded = this.handleAdded.bind(this);
    this.handleRecordAdded = this.handleRecordAdded.bind(this);
  }

  componentDidMount() {
    dictionaryReplacingApi.getAllDictionaries().then((dictionaries) => {
      this.setState((prevState) => ({
        ...prevState,
        dictionaries,
        selectedDictionaryId: dictionaries?.[0]?.dictionaryId,
      }));
    });
  }

  handleSelectDictionary(dictionary) {
    this.setState((prevState) => ({
      ...prevState,
      selectedDictionaryId: dictionary.dictionaryId,
    }));
  }

  handleAdded(key, name) {
    dictionaryReplacingApi.getAllDictionaries().then((dictionaries) => {
      this.setState((prevState) => ({ ...prevState, dictionaries }));
    });
  }

  handleRecordAdded(addedRecordKeys) {
    this.setState((prevState) => ({ ...prevState, addedRecordKeys }));
  }

  render() {
    const selectDictionaryName = this.state.dictionaries
      .filter((d) => d.dictionaryId === this.state.selectedDictionaryId)
      .at(0)?.dictionaryName;

    return (
      <div className={styles.container}>
        <div>
          <label>Dictionaries</label>
          <DictionaryList
            size={10}
            className={styles["dictionary-list"]}
            dictionaries={this.state.dictionaries}
            selectedDictionaryId={this.state.selectedDictionaryId}
            onSelectDictionary={this.handleSelectDictionary}
          />
          <AddDictionary
            className={styles["add-dictionary"]}
            onAdded={this.handleAdded}
          />
        </div>
        {this.state.selectedDictionaryId && (
          <div>
            <div className={styles["dictionary-name"]}>
              {selectDictionaryName}
            </div>
            <div className={styles["search-records-container"]}>
              <SearchRecords
                key={
                  JSON.stringify(this.state.addedRecordKeys) +
                  this.state.selectedDictionaryId
                }
                dictionaryId={this.state.selectedDictionaryId}
              />
            </div>
            <AddNewRecord
              dictionaryId={this.state.selectedDictionaryId}
              className={styles["add-new-record"]}
              onRecordAdded={this.handleRecordAdded}
            />
          </div>
        )}
      </div>
    );
  }
}
