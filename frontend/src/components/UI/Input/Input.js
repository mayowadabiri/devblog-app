// @ts-nocheck
import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  console.log(props.elementType)
  let inputClasses = [classes.InputElement, props.elementStyle];
  let inputTextArea = [classes.Textarea, props.textareaStyle];
  if (
    (!props.isValid && props.touched) ||
    (!props.isValid && !props.formIsValid && props.clicked)
  ) {
    inputClasses.push(classes.Invalid);
    inputTextArea.push(classes.Invalid);
  } else if (props.isValid && props.touched) {
    inputClasses.push(classes.Valid);
    inputTextArea.push(classes.Valid);
  }
  let inputElement;
  switch (props.elementType) {

    case "input":
      inputElement = (
        <input

          className={inputClasses.join(" ")}
          {...props.config}
          value={props.value}
          onChange={props.onchange}
          name={props.label}
          disabled={props.disabled}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
        id="textarea"
          {...props.config}
          value={props.value}
          onChange={props.onchange}
          className={inputTextArea.join(" ")}
          name={props.label}
        ></textarea>
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.onchange}
        >
          {props.config.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className="input"
          {...props.config}
          value={props.value}
          onChange={props.onchange}
          name={props.label}
        />
      );
      break;
  }

  return (
    <div className={[classes.Input, props.inputStyle].join(" ")}>
      <label className={classes.Label} htmlFor={props.label}>
        {props.label}
      </label>
      {inputElement}
      <span
        style={{
          color: "red",
          display: "inline-block",
          textAlign: "start",
          fontSize: "12px",
          width: "100%",
        }}
      >
        {(!props.isValid && props.touched) ||
        (!props.isValid && !props.formIsValid && props.clicked)
          ? props.message
          : ""}
      </span>
    </div>
  );
};

export default Input;
