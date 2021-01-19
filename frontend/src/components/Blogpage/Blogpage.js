import React from "react";
import classes from "./Blogpage.module.css";

const BlogPage = (props) => {
  return (
    <div>
      <div className={classes.BlogpageTitle}>
        <h1>{props.title}</h1>
      </div>
      <div className={classes.BlogpageDetails}>
        <p>Created by: {`${props.fullName}`}</p>
        <p>at: {props.createdAt}</p>
      </div>
      <div className={classes.BlogpageImg}>
        <img src={props.image} alt="blog"  srcSet={props.image}/>
      </div>
      <div className={classes.BlogpageContent}>
        <p>{props.content}</p>
      </div>
    </div>
  );
};

export default BlogPage;
