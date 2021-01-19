import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import Button from "../../components/UI/Button/Button";
import Imagepicker from "../../components/UI/Input/Imagepicker/Imagepicker";
import Input from "../../components/UI/Input/Input";
import classes from "./Createblog.module.css";
import {
  createBlog,
  fetchBlog,
  setBlogInit,
  updateBlog,
} from "../../store/action/index";
import Modal from "../../components/Modal/Modal";
import { checkLength, required } from "../../helpers/validation";
import { useRouteMatch } from "react-router";
import load from "../../constants/image-loader";

const Createblog = (props) => {
  // console.log(props.online)
  const path = props.location.pathname;
  const { params } = useRouteMatch();

  useEffect(() => {
    if (path.includes(`${params.username}`)) {
      props.onFetchBlog(params.blogId);
    } else if (path.includes("create")) {
      props.onSetBlogInit();
    }
  }, [path]);

  const imageRef = useRef();
  const [imageValue, setImageValue] = useState(``);
  const [show, setShow] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [touched, setTouched] = useState(false);
  const [number, setNumber] = useState(0);
  const [blogForm, setBlogForm] = useState({
    title: {
      elementType: "input",
      label: "Title",
      elementConfig: {
        type: "text",
        placeholder: "Enter your story title",
      },
      value: "",
      isValid: false,
      touched: false,
      validations: [required],
      errorMessage: " ",
    },
    content: {
      elementType: "textarea",
      label: "Story",
      elementConfig: {
        type: "text",
        placeholder: "Lets hear you out",
      },
      value: "",
      isValid: false,
      touched: false,
      validations: [checkLength],
      errorMessage: "",
    },
  });
  useEffect(() => {
    if (path.includes(`${params.username}`)) {
      initValue();
    } else if (path.includes("create")) {
      setBlogForm({
        ...blogForm,
        title: {
          ...blogForm["title"],
          value: "",
        },
        content: {
          ...blogForm["content"],
          value: "",
        },
      });
      setImageValue("");
    }
  }, [props.blog]);

  useEffect(() => {
    const text = document.getElementById("textarea");
    const small = document.createElement("P");
    small.classList.add("added");
    small.style.textAlign = "left";
    small.style.color = "red";
    small.innerHTML = "Minimum of 1000 words";
    text.insertAdjacentElement("beforebegin", small);
  }, []);

  const goBackHandler = () => {
    props.history.goBack();
  };

  const initValue = () => {
    setBlogForm({
      ...blogForm,
      title: {
        ...blogForm["title"],
        value: props.blog["title"] || "",
        isValid: true,
      },
      content: {
        ...blogForm["content"],
        value: props.blog["content"] || "",
        isValid: true,
      },
    });
    const imageUrl = `${load}${props.blog.image}`;
    setImageValue(imageUrl);
    setFormValid(true);
  };

  const inputChangeHandler = (event, inputIdentifier) => {
    const { value } = event.target;
    let isValid = true;
    let msg = "";
    for (let validator of blogForm[inputIdentifier].validations) {
      isValid = validator(event.target.value).isTrue && isValid;
      msg = validator(event.target.value).msg;
    }
    const updatedFormElement = {
      ...blogForm[inputIdentifier],
      value: value,
      isValid: isValid,
      touched: true,
      errorMessage: msg,
    };
    const updatedBlogForm = {
      ...blogForm,
      [inputIdentifier]: updatedFormElement,
    };

    let formIsValid = true;
    for (let inputIdentifier in updatedBlogForm) {
      formIsValid = updatedBlogForm[inputIdentifier].isValid && formIsValid;
    }
    setBlogForm(updatedBlogForm);
    setFormValid(formIsValid);
    setNumber(blogForm["content"].value.length + 1);
  };

  const imageChangeHandler = (event) => {
    setTouched(true);
    const image = imageRef.current.files[0];
    console.log(image)

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

  const submit = (event) => {
    setClicked(true);
    let image =
      props.blog.image && !touched
        ? props.blog.image
        : touched
        ? imageRef.current.files[0]
        : "";
    if (!image || image === "") {
      setImageError(true);
    }
    const formData = new FormData();
    formData.append("title", blogForm["title"].value);
    formData.append("content", blogForm["content"].value);
    formData.append("image", image);
    if (!formValid || !image || image === "") {
      setFormValid(false);
      event.preventDefault();
    } else if (formValid && path.includes("create")) {
      setShow(true);
      props.onCreateBlog(formData, props);
    } else if (formValid && path.includes(`${params.username}`)) {
      setShow(true);
      props.onUpdateBlog(formData, props);
    }
  };

  let formArray = [];
  for (let key in blogForm) {
    formArray.push({
      id: key,
      config: blogForm[key],
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
      textareaStyle={classes.Textarea}
      inputStyle={classes.InputStyle}
      label={form.config.label}
      elementStyle={classes.inputElementStyle}
      formIsValid={formValid}
      clicked={clicked}
    />
  ));

  let spinner = props.loading ? (
    <Modal show={show}>
      {path.includes(
        `${params.username} ? "Updating Story" : "Creating Story"`
      )}
    </Modal>
  ) : (
    <div className={classes.Creatblog}>
      <Imagepicker
        touched={touched}
        inputStyle={classes.InputStyle}
        image={classes.imageLoader}
        imageRef={imageRef}
        value={imageValue}
        onImageChange={imageChangeHandler}
        imageError={imageError}
      />
      <form>
        {form}
        <small>{number}</small>
      </form>
      {path.includes("create") ? (
        <Button
          style={classes.Button}
          btntype="success"
          clicked={submit}
          disabled={props.disabled}
        >
          Tell the world
        </Button>
      ) : (
        <div className={classes.UpdateBtns}>
          <Button
            style={classes.UpdateBtn}
            btntype="danger"
            clicked={goBackHandler}
            disabled={props.disabled}
          >
            Cancel
          </Button>
          <Button
            disabled={props.disabled}
            style={classes.UpdateBtn}
            btntype="success"
            clicked={submit}
          >
            Update
          </Button>
        </div>
      )}
    </div>
  );

  return spinner;
};

const mapStateToProps = (state) => {
  return {
    loading: state.blog.loading,
    blog: state.blog.blog,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCreateBlog: (data, props) => {
      dispatch(createBlog(data, props));
    },
    onFetchBlog: (id) => {
      dispatch(fetchBlog(id));
    },
    onSetBlogInit: () => {
      dispatch(setBlogInit());
    },
    onUpdateBlog: (data, props) => {
      dispatch(updateBlog(data, props));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Createblog);
