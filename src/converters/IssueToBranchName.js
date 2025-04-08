import React, { useState } from "react";
import styles from "./IssueToBranchName.module.css";

const prefixMap = {
  story: "feature",
  bug: "bugfix",
  task: "",
};

export function IssueToBranchName() {
  const [issueType, setIssueType] = useState("story");
  const [issueID, setIssueID] = useState("");
  const [issueName, setIssueName] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const handleIssueTypeChange = (e) => {
    setIssueType(e.target.value);
    setIsCopied(false);
  };

  const handleIssueIDChange = (e) => {
    setIssueID(e.target.value);
    setIsCopied(false);
  };

  const handleIssueNameChange = (e) => {
    setIssueName(e.target.value);
    setIsCopied(false);
  };

  const handleCopy = (e) => {
    navigator.clipboard.writeText(getBranchName());
    setIsCopied(true);
  };

  const getBranchName = () => {
    const prefix = prefixMap[issueType];

    const suffix = issueName
      .replaceAll(/\s+/g, "-")
      .replaceAll(/[^a-zA-Z0-9-_./]/g, "");

    return `${prefix}${prefix ? "/" : ""}${issueID}-${suffix}`;
  };

  const branchName = getBranchName();

  return (
    <fieldset className={styles.form}>
      <legend>Git branch name</legend>
      <label>Issue type</label>
      <select onChange={handleIssueTypeChange} value={issueType} className={styles.issueType}>
        <option value={"story"}>Story</option>
        <option value={"bug"}>Bug</option>
        <option value={"task"}>Task</option>
      </select>
      <label>Issue ID</label>
      <input type="text" value={issueID} onChange={handleIssueIDChange} />
      <label>Issue name</label>
      <input type="text" value={issueName} onChange={handleIssueNameChange} />

      <label>Branch name</label>
      <input
        type="text"
        readOnly
        className={styles.branchName}
        value={branchName}
      />
      <button type="button" className={styles.copy} onClick={handleCopy}>
        Copy {isCopied ? "✓" : ""}
      </button>
    </fieldset>
  );
}
