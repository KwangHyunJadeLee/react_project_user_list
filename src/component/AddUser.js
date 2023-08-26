import React, { useState, useRef } from "react";
import Card from "./UI/Card";
import Button from "./UI/Button";
import ErrorModal from "./UI/ErrorModal";
import styles from "./AddUser.module.css";

const AddUser = (props) => {
  const [error, setError] = useState();

  // If just use state for key logger, it's not that good solution.
  // There are unnecessary code and works
  // Just Read a value,, Refs are probably better.
  // Ref means control DOMs directly.

  //********************************************************************/
  // Uncontrolled Component : Can't not be controlled by React like Ref
  // Controlled Component : Can be controlled by React like State
  //********************************************************************/
  
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredAge = ageInputRef.current.value;

    // Data Validation check
    if (enteredName.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid Input",
        message: "Plesas enter a valid name and age (non-empty values).",
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: "Invalid age",
        message: "Plesas enter a valid age (> 0).",
      });
      return;
    }
    props.onAddUser(enteredName, enteredAge);

    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={styles.input}>
        <form onSubmit={submitHandler}>
          <label htmlFor="userName" className={styles.input.label}>
            UserName
          </label>
          <input type="text" id="userName" ref={nameInputRef}></input>
          <label htmlFor="age">Age (Years)</label>
          <input type="number" id="age" ref={ageInputRef}></input>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default AddUser;
