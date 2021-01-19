import React from "react";
import classes from "./Comment.module.css";

const Comment = ({ content, createdAt, ...props }) => {
  const { image } = props.userId;

  const imageUrl = `http://localhost:8080/${image}`;
  const createdDate = new Date(createdAt).toLocaleString();
  return (
    <div className={classes.Container}>
      <div className={classes.Comment}>
        <div className={classes.Comment__Image}>
          {image === "" ? null : <img src={imageUrl} alt="Comment" />}
        </div>
        <div className={classes.Content}>
          <p>"{content}"</p>
        </div>
      </div>
      <div className={classes.Details}>
        <p>Posted by Dabiri Mayowa</p>
        <p>at {createdDate}</p>
      </div>
    </div>
  );
};

export default Comment;
