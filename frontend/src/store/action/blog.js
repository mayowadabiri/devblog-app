import axiosURL from "../../constants/axios-create";
import * as actionTypes from "./actionTypes";
import { fetchUser } from "./user";


export const createStart = () => {
  return {
    type: actionTypes.CREATE__BLOG__START,
  };
};

export const createSuccess = (stories) => {
  return {
    type: actionTypes.CREATE__BLOG__SUCCESS,
    stories,
  };
};

export const createFailed = (error) => {
  return {
    type: actionTypes.CREATE__BLOG__FAILED,
    error,
  };
};

export const createBlog = (data, props) => (dispatch) => {
  const token = localStorage.getItem("token")
  dispatch(createStart());
  axiosURL
  .post("/postBlog", data, {
    headers:{
      "Authorization" : `Bearer ${token}`
    }
  })
    .then((result) => {
      dispatch(createSuccess(result.data));
      props.history.push("/home")
    })
    .catch((error) => {
      dispatch(createFailed(error.response));
    });
};

export const fetchBlogsStart = () => {
  return {
    type: actionTypes.FETCH__BLOGS__START,
  };
};

export const fetchBlogsSuccess = (blogs) => {
  return {
    type: actionTypes.FETCH__BLOGS__SUCCESS,
    blogs: blogs,
  };
};

export const fetchBlogsFailed = (error) => {
  return {
    type: actionTypes.FETCH__BLOGS__FAILED,
    error,
  };
};

export const fetchBlogs = () => (dispatch) => {
  dispatch(fetchBlogsStart());
  axiosURL
    .get("/blogs")
    .then((result) => {
      const sortedBlogs = result.data.blogs.sort((a,b) =>{
        let x = new Date(a.createdAt),
            y = new Date(b.createdAt);
            return y-x
      })
      dispatch(fetchBlogsSuccess( sortedBlogs));
    })
    .catch((error) => {
        dispatch(fetchBlogsFailed(error.response))
    });
};


export const fetchBlogStart = () =>{
  return{
    type: actionTypes.FETCH__BLOG__START
  }
}

export const fetchBlogSuccess = (blog) =>{
  return{
    type: actionTypes.FETCH__BLOG__SUCCESS,
    blog: blog
  }
}

export const fetchBlogFailed = (error) =>{
  return{
    type: actionTypes.FETCH__BLOG__FAILED,
    error
  }
}

export const fetchBlog = (id) => dispatch =>{
  dispatch(fetchBlogStart())
  axiosURL.get(`/blog/${id}`)
    .then(result =>{
      dispatch(fetchBlogSuccess(result.data.blog))
    })
    .catch(error =>{
      dispatch(fetchBlogFailed(error.response))
    })
}



export const updateBlogStart = () =>{
  return{
    type: actionTypes.UPDATE__BLOG__START
  }
}

export const updateBlogSuccess = () =>{
  return{
    type: actionTypes.UPDATE__BLOG__SUCCESS
  }
}

export const updateBlogFailed = (error) =>{
  return{
    type: actionTypes.UPDATE__BLOG__FAILED,
    error: error
  }
}


export const updateBlog =(data, props) => dispatch =>{
  const token = localStorage.getItem("token")
    dispatch(updateBlogStart());
    axiosURL.put(`blog/${props.blog._id}`, data, {
      headers:{
        "Authorization" : `Bearer ${token}`
      }
    }).then(result =>{
      dispatch(updateBlogSuccess());
      props.history.push(`/${props.match.params.username}`)

    }).catch(error =>{
      dispatch(updateBlogFailed(error.response))
    })
}




export const deleteBlogStart = () =>{
  return{
    type: actionTypes.DELETE__BLOG__START
  }
}


export const deleteBlogSuccess = (id) =>{
  return{
    type: actionTypes.DELETE__BLOG__SUCCESS,
    id
  }
}

export const deleteBlogFailed = (error) =>{
  return{
    type: actionTypes.DELETE__BLOG__FAILED,
    error
  }
}

export const deleteBlog = (id, username) => dispatch => {
  const token = localStorage.getItem("token")
  dispatch(deleteBlogStart());
  axiosURL.delete(`/blog/${id}`, {
    headers:{
      "Authorization": `Bearer ${token}`
    }
  })
  .then(result =>{
    dispatch(deleteBlogSuccess(id))
    dispatch(fetchUser(username))
  })
  .catch(error =>{
    dispatch(deleteBlogFailed(error.response))
  })
}


export const setBlogInit = () =>{
  return{
    type: actionTypes.SET__BLOG__INIT
  }
}