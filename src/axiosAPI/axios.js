import axios from "axios";
//------------create environment---------------
export default axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+localStorage.getItem('access_token')  //this is how to sent bare token to api
  }
});
