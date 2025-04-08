import React, { createRef } from "react";
import dictionaryReplacingApi from "../dictionaryReplacingApi";
import styles from "./AddNewRecord.module.css";

export class AddNewRecord extends React.Component {
  fromRef = createRef();
  toRef = createRef();

  constructor(props) {
    super(props);

    this.state = {
      from: "",
      to: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    this.setState({
      [target.name]: target.value,
    });
  }

  async handleAdd(e) {
    if (!this.validate()) {
      return;
    }

    const record = {
      dictionaryId: this.props.dictionaryId,
      from: this.state.from,
      to: this.state.to,
    };
    const addedRecordKeys = await dictionaryReplacingApi.addRecord(record);

    if (this.props.onRecordAdded) {
      this.props.onRecordAdded(addedRecordKeys);
    }

    this.setState({
      from: "",
      to: "",
    });
  }

  validate() {
    return (
      this.fromRef.current.reportValidity() &&
      this.toRef.current.reportValidity()
    );
  }

  render() {
    return (
      <div className={this.props.className}>
        <div className={styles.title}>Add a new record</div>
        <label for="from">From</label>
        <input
          type="text"
          id="from"
          name="from"
          required
          ref={this.fromRef}
          className={styles.from}
          value={this.state.from}
          onChange={this.handleChange}
        />
        <label for="to">To</label>
        <input
          type="text"
          id="to"
          name="to"
          required
          ref={this.toRef}
          className={styles.to}
          value={this.state.to}
          onChange={this.handleChange}
        />
        <div className={styles["button-container"]}>
          <input
            type="button"
            value="Add new record"
            onClick={this.handleAdd}
          />
        </div>
      </div>
    );
  }
}
