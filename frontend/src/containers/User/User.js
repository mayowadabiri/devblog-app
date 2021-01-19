import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Profile from "../../components/Profile/Profile";
import classes from "./User.module.css";
import * as actionCreators from "../../store/action/index";
import Modal from "../../components/Modal/Modal";
import { Link, Route, useRouteMatch, Switch } from "react-router-dom";
import ProfileEdit from "./ProfileEdit/ProfileEdit";
import Blogitem from "../../components/BlogItem/Blogitem";
import { parseContent } from "../../helpers/contentParser";
import load from "../../constants/image-loader";

const User = (props) => {
  const [show, setShow] = useState(false);
  let { url, params } = useRouteMatch();
  useEffect(() => {
    props.onFetchUser(params.username);
    setShow(true);
  }, []);

  const setEditHandler = () => {
    props.onToggleEdit();
  };

  const goBackHandler = () => {
    props.onToggleEdit();
    props.history.goBack();
  };

  const deleteHandler = (id) => {
    props.onDeleteBlog(id, props.user.username);
  };

  const { image, blogs, username, createdAt, comments } = props.user;
  let imageURL = image === "" ? "" : `${load}${image}`;
  const createdDate = new Date(`${createdAt}`).toLocaleString();
  let userData = (
    <div className={classes.User}>
      <Profile
        {...props.user}
        image={imageURL}
        buttonClicked={setEditHandler}
        buttonStyle={classes.ButtonStyle}
        toLink={`${url}/edit-profile`}
        linkStyle={classes.LinkStyle}
        numOfBlogs={blogs.length}
        numOfComments={comments.length}
        createdDate={createdDate}
        disabled ={props.disabled}
      />
    </div>
  );

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
      const content = parseContent(blog.content);
      let image = `${load}${blog.image}`;
      const createdDate = new Date(`${blog.createdAt}`).toLocaleString();
      return (
        <Blogitem
          key={blog._id}
          id={blog._id}
          title={blog.title}
          content={content}
          createdAt={createdDate}
          image={image}
          username={username}
          deleteBlog={() => deleteHandler(blog._id)}
          style={classes.BlogItem}
        />
      );
    });
  }

  const user = props.loading ? (
    <Modal show={show}>Fetching User...</Modal>
  ) : (
    <div className={classes.Profile}>
      {props.onEdit ? (
        <Switch>
          <Route
            path={`/user/:username/edit-profile`}
            render={(routeProps) => (
              <ProfileEdit
                {...routeProps}
                {...props.user}
                goBack={goBackHandler}
              />
            )}
          />
        </Switch>
      ) : (
        userData
      )}
      <div className={classes.Blog}>
        <h1>Your Blogs</h1>
        {blog}
      </div>
    </div>
  );

  const userDetails = props.error ? (
    <h1
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        color: "purple ",
        marginTop: "100px",
      }}
    >
      {props.error.message}
    </h1>
  ) : (
    user
  );

  return userDetails;
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    loading: state.user.loading,
    onEdit: state.user.editing,
    error: state.user.error,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onFetchUser: (username) => {
      dispatch(actionCreators.fetchUser(username));
    },
    onToggleEdit: () => {
      dispatch(actionCreators.toggleEdit());
    },
    onDeleteBlog: (id, username) => {
      dispatch(actionCreators.deleteBlog(id, username));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(User);
