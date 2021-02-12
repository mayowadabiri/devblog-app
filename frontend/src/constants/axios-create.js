import axios from "axios";


 const axiosURL = axios.create({
   baseURL: "http://localhost:8000/",
 });

export default axiosURL