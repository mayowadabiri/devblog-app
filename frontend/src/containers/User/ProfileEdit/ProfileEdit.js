import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import Modal from "../../../components/Modal/Modal";
import { required } from "../../../helpers/validation";
import * as actionCreators from "../../../store/action";
import classes from "./ProfileEdit.module.css";
import {username as usernameValidator} from "../../../helpers/validation"
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import Imagepicker from "../../../components/UI/Input/Imagepicker/Imagepicker";

const ProfileEdit = ({
  _id,
 username,
 fullName,
  bio,
  image,
  gender,
  title,
  email,
  goBack,
  onLoadUpdate,
  ...props
}) => {
  
  const imageRef = useRef();
  const [imageValue, setImageValue] = useState("");
  const [imageError, setImageError] = useState(true);
  const [touched, setTouched] = useState(false);
  const [show, setShow] = useState(false)
  const [profileEditForm, setProfileEditForm] = useState({
    username: {
      elementType: "input",
      label: "username",
      elementConfig: {
        type: "text",
        placeholder: "e.g devdabiri",
      },
      validators: [usernameValidator],
      isValid: false,
      touched: false,
      value: username ? username : "",
      errorMessage: "",
    },
    fullName: {
      elementType: "input",
      label: "Full Name",
      elementConfig: {
        type: "text",
        placeholder: "Dabiri Mayowa",
      },
      validators: [required],
      isValid: false,
      touched: false,
      value: fullName ? fullName : "",
      errorMessage: "",
    },
    email: {
      elementType: "input",
      label: "Email",
      elementConfig: {
        type: "email",
        placeholder: "Email",
      },
      disabled: true,
      validators: [required],
      isValid: false,
      touched: false,

      value: email ? email : "",
      errorMessage: "",
    },
    bio: {
      elementType: "textarea",
      label: "Bio",
      elementConfig: {
        type: "text",
        placeholder: "Tell us a bit about yourself",
      },
      validators: [],
      isValid: false,
      touched: false,
      value: bio ? bio : "",
      errorMessage: "",
    },
    gender: {
      elementType: "select",
      label: "Gender",
      elementConfig: {
        options: [
          { value: "Male", displayValue: "Male" },
          { value: "Female", displayValue: "Female" },
        ],
      },
      validators: [],
      value: gender ? gender : "Male",
      isValid: true,
    },
    jobTitle: {
      elementType: "input",
      label: "Job title",
      elementConfig: {
        type: "text",
        placeholder: "e.g Software Engineer",
      },
      validators: [],
      isValid: false,
      touched: false,
      value: title ? title : "",
      errorMessage: "",
    },
  });

  const inputChangeHandler = (event, inputIdentifier) => {
    let isValid = true;
    let msg = "";
    for (let validator of profileEditForm[inputIdentifier].validators) {
      isValid = validator(event.target.value).isTrue && isValid;
      msg = validator(event.target.value).msg;
    }

    const updatedFormElement = {
      ...profileEditForm[inputIdentifier],
      value: event.target.value,
      isValid: isValid,
      touched: true,
      errorMessage: msg,
    };
    const updatedprofileEditForm = {
      ...profileEditForm,
      [inputIdentifier]: updatedFormElement,
    };

    let formIsValid = true;
    for (let inputIdentifier in updatedprofileEditForm) {
      formIsValid =
        updatedprofileEditForm[inputIdentifier].isValid && formIsValid;
    }
    setProfileEditForm(updatedprofileEditForm);
  };

  const imageChangeHandler = (event) => {
    setTouched(true);
    const image = imageRef.current.files[0];
    if (
      image.type !== "image/jpeg" ||
      image.type !== "image/png" ||
      image.type !== "image/jpg"
    ) {
      event.preventDefault();
      setImageError(false);
    }
    setImageError(true);
    setImageValue(URL.createObjectURL(image));
  };
  
  const submitHandler = () => {
    setShow(true)
    const formData = new FormData();
    let imageUrl = image;
    if (imageRef.current.files[0]) {
      imageUrl = imageRef.current.files[0];
    }
    formData.append("username", profileEditForm["username"].value);
    formData.append("fullName", profileEditForm["fullName"].value);
    formData.append("bio", profileEditForm["bio"].value);
    formData.append("email", profileEditForm["email"].value);
    formData.append("title", profileEditForm["jobTitle"].value);
    formData.append("gender", profileEditForm["gender"].value);
    formData.append("image", imageUrl);
    onLoadUpdate(formData, props);
    console.log(props.loading)
  };

  let formArray = [];
  for (let key in profileEditForm) {
    formArray.push({
      id: key,
      config: profileEditForm[key],
    });
  }

  let form = formArray.map((form) => (
    <Input
      key={form.id}
      config={form.config.elementConfig}
      onchange={(event) => inputChangeHandler(event, form.id)}
      value={form.config.value}
      elementType={form.config.elementType}
      isValid={form.config.isValid}
      touched={form.config.touched}
      message={form.config.errorMessage}
      style={classes.Textarea}
      disabled={form.config.disabled}
      label={form.config.label}
    />
  ));

  let loading = props.loading ? (
    <Modal show={show}>Updating User... </Modal>
  ) : (
    <div className={classes.ProfileEditForm}>
      <Imagepicker
        touched={touched}
        image={classes.ImageLoader}
        imageRef={imageRef}
        value={imageValue}
        onImageChange={imageChangeHandler}
        imageError={imageError}
      />
      <div className={classes.ProfileEdit}>{form}</div>
      <div className={classes.ButtonStyles}>
        <Button btntype="danger" style={classes.ButtonStyle} clicked={goBack}>
          Cancel
        </Button>
        
        <Button
          btntype="success"
          style={classes.ButtonStyle}
          clicked={submitHandler}
        >
          Update
        </Button>
      </div>
    </div>
  );

  return loading;
};

const mapStateToProps = (state) => {
  return {
    loading: state.user.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadUpdate: (userData, props, url) => {
      dispatch(actionCreators.updateUser(userData, props, url));
    },
    onToggleEdit: () => {
      dispatch(actionCreators.toggleEdit());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
