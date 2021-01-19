import axios from "axios";


 const axiosURL = axios.create({
   baseURL: "https://api-dev-story.herokuapp.com/",
 });

export default axiosURL