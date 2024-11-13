import axios from "axios";
import catchAxiosError from "./error";
import Cookies from "js-cookie";

const api_url = process.env.REACT_APP_BACK_URL;
export async function signUp(params) {
  const res = await axios
    .post(`${api_url}/users/signup`, params, { withCredentials: true })
    .catch(catchAxiosError);

  if (res.error) {
    return res;
  } else if (!res.data) {
    return "Something went wrong!";
  }

  return res;
}

export async function signIn(params) {
  const res = await axios
    .post(`${api_url}/users/signin`, params, { withCredentials: true })
    .catch(catchAxiosError);

  if (res.error) {
    return res;
  } else if (!res.data) {
    return "Something went wrong!";
  }

  return res;
}
export async function signOut() {
  /*   const res = await axios
    .post(`${api_url}/users/signout`,{withCredentials:true})
    .catch(catchAxiosError)

  if (res.error) {
    return res
  } else if (!res.data) {
    return 'Something went wrong!'
  }

  return res */
  Cookies.remove("session");
}
export async function checkAuth() {
  const res = await axios
    .get(`${api_url}/users/currentuser`, { withCredentials: true })
    .catch(catchAxiosError);

  if (res.error) {
    return res;
  } else if (!res.data) {
    return "Something went wrong!";
  }
  return res.data.currentUser;
}
export async function saveFile(params) {
  const res = await axios
    .post(`${api_url}/files`, params, { withCredentials: true })
    .catch(catchAxiosError);

  if (res.error) {
    return res;
  } else if (!res.data) {
    return "Something went wrong!";
  }
  return res.data;
}
export async function getFolders() {
  const res = await axios
    .get(`${api_url}/folders`, { withCredentials: true })
    .catch(catchAxiosError);

  if (res.error) {
    return res;
  } else if (!res.data) {
    return "Something went wrong!";
  }
  return res.data;
}

export async function createFolder(params) {
  const res = await axios
    .post(`${api_url}/folders`, params, { withCredentials: true })
    .catch(catchAxiosError);

  if (res.error) {
    return res;
  } else if (!res.data) {
    return "Something went wrong!";
  }
  return res.data;
}

export async function getFile() {
  const res = await axios
    .get(`${api_url}/files/first`, { withCredentials: true })
    .catch(catchAxiosError);

  if (res.error) {
    return res;
  } else if (!res.data) {
    return "Something went wrong!";
  }
  return res.data;
}
export async function editFile(params) {
  const res = await axios
    .put(`${api_url}/files/edit`, params, { withCredentials: true })
    .catch(catchAxiosError);

  if (res.error) {
    return res;
  } else if (!res.data) {
    return "Something went wrong!";
  }
  return res.data;
}
export async function deleteFile(params) {
  console.log(params);
  const res = await axios
    .delete(`${api_url}/files/${params.fileName}`, { withCredentials: true })
    .catch(catchAxiosError);

  if (res.error) {
    return res;
  } else if (!res.data) {
    return "Something went wrong!";
  }
  return res.data;
}
