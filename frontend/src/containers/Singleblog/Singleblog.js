// @ts-nocheck
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import BlogPage from "../../components/Blogpage/Blogpage";
import Button from "../../components/UI/Button/Button";
import Comment from "../../components/Comment/Comment";
import Input from "../../components/UI/Input/Input";
import * as actionCreators from "../../store/action/index";
import classes from "./Singleblog.module.css";
import { required } from "../../helpers/validation";
import Modal from "../../components/Modal/Modal";
import load from "../../constants/image-loader";
import Blogsummary from "../Blogsummary/Blogsummary";

const Singleblog = (props) => {
  const [commentForm, setCommentForm] = useState({
    comment: {
      elementType: "textarea",
      elementConfig: {
        type: "text",
        placeholder: "You've got something to say to this story??",
      },
      value: "",
      isValid: false,
      message: "",
      touched: false,
    },
    formValid: false,
  });
  const [clicked, setClicked] = useState(false);
  const [show, setShow] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const { params } = useRouteMatch();

  useEffect(() => {
    props.onLoadBlog(params.blogId);

    setShow(true);
  }, []);

  useEffect(() => {
    if (props.isAuth) {
      props.onFetchComments(params.blogId);
    }
  }, [props.comment]);

  const commentChangeHandler = (event) => {
    let isValid = true;
    let msg = "";
    isValid = required(event.target.value).isTrue;
    msg = required(event.target.value).msg;
    setCommentForm({
      ...commentForm,
      comment: {
        ...commentForm.comment,
        value: event.target.value,
        isValid: isValid,
        message: msg,
        touched: false,
      },
      formValid: isValid && true,
    });
  };

  const createComment = (event) => {
    setClicked(true);
    const content = { content: commentForm.comment.value };
    if (!commentForm.formValid) {
      event.preventDefault();
    } else {
      props.onCreateComment(content, params.blogId);
      setCommentForm({
        ...commentForm,
        comment: {
          ...commentForm.comment,
          value: "",
          isValid: false,
          message: "",
          touched: false,
        },
        formValid: false,
      });
      setClicked(false);
    }
  };

  let input = (
    <Input
      elementType={commentForm.comment.elementType}
      value={commentForm.comment.value}
      config={commentForm.comment.elementConfig}
      onchange={commentChangeHandler}
      textareaStyle={classes.Textarea}
      isValid={commentForm.comment.isValid}
      clicked={clicked}
      touched={commentForm.comment.touched}
      formIsValid={commentForm.formValid}
    />
  );

  let commentInput = props.isAuth ? (
    <>
      {input}
      <Button
        btntype={"success"}
        style={classes.Button}
        clicked={createComment}
        disabled={props.disabled}
      >
        Submit
      </Button>
    </>
  ) : (
    <p>
      <Link
        to={{
          pathname: "/login",
          search: `?redirect=true`,
        }}
      >
        {" "}
        Login
      </Link>{" "}
      to comment
    </p>
  );

  const { title, content, image, createdAt } = props.blog;
  const createdDate = new Date(`${createdAt}`).toLocaleString();
  const { fullName } = props.blog.userId || "";
  let imageURL = `${load}${image}`;

  let comment =
    props.comments.length < 1
      ? "No comment"
      : props.comments
          .sort((a, b) => {
            let x = new Date(a.createdAt),
              y = new Date(b.createdAt);
            return y - x;
          })
          .map((comment) => <Comment {...comment} key={comment._id} />);

  let blog = props.loading ? (
    <Modal show={show}>Fetching Story</Modal>
  ) : (
    <>
      <div className={classes.Blogpage}>
        <BlogPage
          title={title}
          content={content}
          image={imageURL}
          fullName={fullName}
          createdAt={createdDate}
        />
        <Button
          btntype={"success"}
          style={classes.Button}
          disabled={props.disabled}
          clicked={() => {
            setShowSummary(true);
          }}
        >
          Get Summary
        </Button>
        <div className={classes.Input}>
          <h3>Comment below:</h3>
          {commentInput}
        </div>

        <div className={classes.Comments}>{comment}</div>
      </div>
    </>
  );

  return (
    <>
      {showSummary ? (
        <Blogsummary
          id={params.blogId}
          show={showSummary}
          close={() => {
            setShowSummary(false);
          }}
        />
      ) : null}
      {blog}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.blog.loading,
    blog: state.blog.blog,
    comments: state.comment.comments,
    isAuth: state.auth.token !== null,
    loadingComment: state.comment.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadBlog: (id) => {
      dispatch(actionCreators.fetchBlog(id));
    },
    onCreateComment: (commentData, id) => {
      dispatch(actionCreators.createComment(commentData, id));
    },
    onFetchComments: (id) => {
      dispatch(actionCreators.fetchComments(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Singleblog);
