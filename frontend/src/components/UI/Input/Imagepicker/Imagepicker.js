import React from "react";
import classes from "../Input.module.css";
import ImageClasses from "./Imagepicker.module.css";

const Imagepicker = (props) => {
  const inputClasses = [ImageClasses.img, props.image];
  if (!props.imageError && props.touched) {
    inputClasses.push(classes.Invalid);
  } else if (props.imageError && props.touched) {
    inputClasses.push(classes.Valid);
  }
  return (
    <div
      className={[
        classes.Input,
        props.inputStyle,
        ImageClasses.ImagePicker,
      ].join(" ")}
    >
      <div className={ImageClasses.Container}>
        <div className={ImageClasses.uploadImage}>
          <label htmlFor="file">Click here to upload</label>
          <input
            onChange={props.onImageChange}
            ref={props.imageRef}
            className={ImageClasses.imgElement}
            type="file"
            name="file"
          />
        </div>

        <span style={{ display: "block", textAlign: "start", color: "red" }}>
          Supported types * jpg/jpeg/png
        </span>
      </div>

      <div className={inputClasses.join(" ")}>
        {props.value && <img src={props.value} alt="show " />}
      </div>
      {!props.touched && props.imageError ? (
        <small style={{ display: "block", textAlign: "start", color: "red"}}>
          Enter a valid picture
        </small>
      ) : null}
    </div>
  );
};

export default Imagepicker;
