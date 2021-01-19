import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import Blogitem from "../../components/BlogItem/Blogitem";
import Modal from "../../components/Modal/Modal";
import Profile from "../../components/Profile/Profile";
import * as actionCreators from "../../store/action";
import classes from "./UserDetails.module.css";
import {parseContent} from "../../helpers/contentParser"

const UserDetails = (props) => {
  const { params } = useRouteMatch();

  useEffect(() => {
    props.onLoadDetails(params.username);
  }, []);

  const {
    fullName,
    bio,
    image,
    title,
    stack,
    gender,
    email,
    blogs,
    username,
  } = props.details;
  let imageURL = image === "" ? "" : `http://localhost:8080/${image}`;

  let blog = "";
  if (blogs.length < 1) {
    blog = (
      <div>
        <p>
          You don't have any blog yet. Click <Link to="/create">here</Link> to
          create{" "}
        </p>
      </div>
    );
  } else {
    blog = blogs.map((blog) => {
      const content = parseContent(blog.content)
      let image = `http://localhost:8080/${blog.image}`;
      return (
        <Blogitem
          key={blog._id}
          id={blog._id}
          title={blog.title}
          content={content}
          createdAt={blog.createdAt}
          image={image}
          username={username}
          style={classes.BlogItem}
        />
      );
    });
  }

  let userData = (
    <div className={classes.User}>
      <Profile
        fullname={fullName}
        bio={bio}
        image={imageURL}
        stack={stack}
        gender={gender}
        email={email}
        title={title}
        username={username}
        buttonStyle={classes.ButtonStyle}
        linkStyle={classes.LinkStyle}
      />
    </div>
  );

  const user = props.loading ? (
    <Modal show={true}>Fetching User Details</Modal>
  ) : (
    <div className={classes.Profile}>
      <div>{userData}</div>
      <div className={classes.Blog}>
        <h1> Blogs</h1>
        {blog}
      </div>
    </div>
  );

  return user;
};

const mapStateToProps = (state) => {
  return {
    details: state.user.userDetails,
    loading: state.user.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadDetails: (username) => {
      dispatch(actionCreators.fetchDetails(username));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
