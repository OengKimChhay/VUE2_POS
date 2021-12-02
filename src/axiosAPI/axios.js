import axios from "axios";
//------------create environment---------------
export default axios.create({
  baseURL: "http://178.128.119.167:1027/api",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+localStorage.getItem('access_token')  //this is how to sent bare token to api
  }
});
