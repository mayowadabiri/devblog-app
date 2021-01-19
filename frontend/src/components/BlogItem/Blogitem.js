import React from "react";
import { withRouter } from "react-router-dom";
import classes from "./Blogitem.module.css";
import { useRouteMatch } from "react-router-dom";
import LinkButton from "../UI/Link/Link";

const Blogitem = ({ match, onStart, ...props }) => {
  console.log(props.image)
  const { url } = useRouteMatch();
  const blogPath = match.path;
  let link =
    url === "/" ? `/blog/${props.id}` : `${url}/blog/${props.id}/edit-blog`;
  let readLink =
    url === "/home" ? `blog/${props.id}` : `${url}/blog/${props.id}`;
  return (
    <div className={[classes.Blogitems, props.style].join("   ")}>
      <div className={classes.BlogImg}>
        <img src={props.image} alt="img" />
      </div>
      <div className={classes.blogdetails}>
        <div className={classes.blogtext}>
          <h1>{props.title}</h1>
          <p>{props.content}....</p>
          <LinkButton
            linkStyle={classes.blogLinks}
            styleType={"success"}
            link={readLink}
          >
            Read More
          </LinkButton>
        </div>
        <div className={classes.blogTime}>
          <p>
            by:{" "}
            <LinkButton
              linkStyle={classes.blogLinks}
              link={`/author/${props.username}`}
              styleType="success"
            >
              {" "}
              {`${props.username}`}
            </LinkButton>
          </p>
          <p>{props.createdAt}</p>
        </div>
        {blogPath === "/user/:username" ? (
          <div className={classes.BlogButtons}>
            <LinkButton
              link={{
                pathname: link,
                search: "?editing=true",
              }}
              styleType="success"
              linkStyle={[classes.ButtonStyle, classes.EditBtn].join(" ")}
            >
              Edit
            </LinkButton>
            <LinkButton
              styleType={"danger"}
              linkStyle={classes.ButtonStyle}
              clicked={props.deleteBlog}
              link={url}
            >
              Delete
            </LinkButton>
          </div>
        ) : blogPath === "/home" ? null : null}
      </div>
    </div>
  );
};

export default withRouter(Blogitem);
