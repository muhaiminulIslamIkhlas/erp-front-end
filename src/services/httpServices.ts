import axios from "axios";

axios.defaults.headers.common = {'Accept': 'application/json'}

function setJwt(jwt:any) {
  axios.defaults.headers.common = {'Authorization': `Bearer ${jwt}`}
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
