import React from "react";
import { useRouteMatch } from "react-router-dom";
import classes from "./Profile.module.css";
import twitter from "../../assets/twitter.png";
import github from "../../assets/github.png";
import linkedin from "../../assets/linkedin.png";
import LinkButton from "../UI/Link/Link";

const Profile = (props) => {
  const { path } = useRouteMatch();
  return (
    <div className={classes.Container}>
      <div className={classes.UserProfile}>
        <div className={classes.ProfileImg}>
          {props.image !== "" ? (
            <img src={props.image} alt="user" />
          ) : (
            <p className={classes.NoImage}>
              {path.includes("author") ? "No Image" : "Upload your Image here"}
            </p>
          )}
        </div>
        <div className={classes.UserDetails}>
          <div className={classes.UserName}>
            <h1>{props.fullName}</h1>
            <p className={classes.Profile__Bio}>{props.bio}</p>
          </div>
          <div className={classes.MetaData}>
            <div className={classes.UserInfo}>
              <p>
                <span>Username: </span>
                <span>@{props.username}</span>
              </p>
              <p>
                <span>E-mail: </span>
                <span> {props.email}</span>
              </p>
              <p>
                <span>Title: </span>
                <span>{props.title}</span>
              </p>
            </div>
            <div className={classes.Statistics}>
              <p>
                <span>Blogs posted: </span>
                <span>{props.numOfBlogs}</span>
              </p>
              <p>
                <span>Date Joined: </span>
                <span>{props.createdDate}</span>
              </p>
              <p>
                <span>Total Comments: </span>
                <span>{props.numOfComments}</span>
              </p>
            </div>
          </div>
          <div className={classes.UserLink}>
            <h2>Follow/Connect @{props.username} on</h2>
            <div className={classes.User_Links}>
              <div className={classes.User_link}>
                <a
                  href={props.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={twitter} alt="twitter logo" />
                </a>
              </div>
              <div className={classes.User_link}>
                <a
                  href={props.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={linkedin} alt="linkedin logo" />
                </a>
              </div>
              <div className={classes.User_link}>
                <a
                  href={props.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "white" }}
                >
                  <img src={github} alt="github logo" />
                </a>
              </div>
            </div>
          </div>
          {path.includes("author") ? (
            ""
          ) : (
            <LinkButton
              styleType="success"
              linkStyle={classes.LinkStyle}
              link={props.toLink}
              clicked={props.buttonClicked}
            >
              Update Profile
            </LinkButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
