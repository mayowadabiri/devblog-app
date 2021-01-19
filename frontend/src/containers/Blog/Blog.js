import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import About from "../../components/About/About";
import Blogitem from "../../components/BlogItem/Blogitem";
import Modal from "../../components/Modal/Modal";
import { fetchBlogs } from "../../store/action/index";
import classes from "./Blog.module.css";
import { parseContent } from "../../helpers/contentParser";
import load from "../../constants/image-loader"

const Blog = (props) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    props.onLoadBlog();
    setShow(true);
  }, []);

  let blog = props.loading ? <Modal show={show}>Fetching Stories</Modal> : null;

  let myBlog = props.blogs.map((blog) => {
    let { username } = blog.userId;
    const content = parseContent(blog.content);

    let image = `${blog.image}`;
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
        style={classes.Blogitem}
      />
    );
  });

  return (
    <>
      {blog}
      <div className={classes.Blogs}>
        <div className={classes.Blog}>
          <div>
            <h2>Top Gists for you today</h2>
            <div className={classes.Blogitems}>{myBlog}</div>
          </div>
          {useMemo(
            () => (
              <div className={classes.About}>
                <About />
              </div>
            ),
            []
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.blog.loading,
    blogs: state.blog.blogs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadBlog: () => {
      dispatch(fetchBlogs());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Blog);
