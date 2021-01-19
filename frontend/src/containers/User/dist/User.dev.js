// import React, { useEffect, useState } from "react";
// import { connect } from "react-redux";
// import Profile from "../../components/Profile/Profile";
// import classes from "./User.module.css";
// import * as actionCreators from "../../store/action/index";
// import Modal from "../../components/Modal/Modal";
// import { Link, Route, useRouteMatch, Switch } from "react-router-dom";
// import ProfileEdit from "./ProfileEdit/ProfileEdit";
// import Blogitem from "../../components/BlogItem/Blogitem";
// import {parseContent} from "../../helpers/contentParser"
// const User = (props) => {
//   const [show, setShow] = useState(false);
//   let { url, path, params } = useRouteMatch();
//   useEffect(() => {
//     props.onFetchUser(params.username);
//     setShow(true);
//   }, []);
//   const setEditHandler = () => {
//     props.onToggleEdit();
//   };
//   const goBackHandler = () => {
//     props.onToggleEdit();
//     props.history.goBack()
//   };
//   const deleteHandler = (id) =>{
//       props.onDeleteBlog(id, props.user.username)
//   }
//   const {
//     fullName,
//     bio,
//     image,
//     title,
//     stack,
//     gender,
//     email,
//     blogId,
//     username,
//     createdAt
//   } = props.user;
//   let imageURL = image === "" ? "" : `http://localhost:8080/${image}`;
//   const createdDate = new Date(`${createdAt}`).toLocaleString()
//   let userData = (
//     <div className={classes.User}>
//       <Profile
//         fullname = {fullName}
//         bio={bio}
//         image={imageURL}
//         stack={stack}
//         gender={gender}
//         email={email}
//         title={title}
//         username = {username}
//         buttonClicked={setEditHandler}
//         buttonStyle={classes.ButtonStyle}
//         toLink ={`${url}/edit-profile`}
//         linkStyle={classes.LinkStyle}
//         numOfBlogs={blogId.length}
//         createdDate ={createdDate}
//       />
//     </div>
//   );
//   let blog = "";
//   if (blogId.length < 1) {
//     blog = (
//       <div>
//         <p>You don't have any blog yet. Click <Link to="/create">here</Link> to create  </p>
//       </div>
//     )
//   } else {
//     blog = blogId.map((blog) => {
//       const content = parseContent(blog.content)
//       let image = `http://localhost:8080/${blog.image}`;
//       return (
//         <Blogitem
//           key={blog._id}
//           id={blog._id}
//           title={blog.title}
//           content={content}
//           createdAt={blog.createdAt}
//           image={image}
//           username = {username}
//           deleteBlog = {() => deleteHandler(blog._id)}
//           style={classes.BlogItem}
//         />
//       );
//     });
//   }
//   const user = props.loading ? (
//     <Modal show={show}>Fetching User...</Modal>
//   ) : (
//     <div className={classes.Profile}>
//       {props.onEdit ? (
//         <Switch>
//           <Route
//             path={`${path}${props.editing ? "/edit-profile" : ""}`}
//             render={(routeProps) => (
//               <ProfileEdit
//                 {...routeProps}
//                 {...props.user}
//                 goBack={goBackHandler}
//               />
//             )}
//           />
//         </Switch>
//       ) : (
//         userData
//       )}
//       <div className={classes.Blog}>
//         <h1>Your Blogs</h1>
//         {blog}
//         </div>
//     </div>
//   );
//   return user;
// };
// const mapStateToProps = (state) => {
//   return {
//     user: state.user.user,
//     loading: state.user.loading,
//     onEdit: state.user.editing,
//   };
// };
// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     onFetchUser: (username) => {
//       dispatch(actionCreators.fetchUser(username));
//     },
//     onToggleEdit: () => {
//       dispatch(actionCreators.toggleEdit());
//     },
//     onDeleteBlog: (id, username)=>{
//       dispatch(actionCreators.deleteBlog(id, username))
//     }
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(User);
"use strict";