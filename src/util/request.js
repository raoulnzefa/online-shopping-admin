import axios from "axios";
import { getToken } from "@/util/cookies.js";
import store from "@/store";

const server = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
});

server.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

server.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code !== 0) {
      return Promise.reject(res.message || "error");
    } else {
      return res;
    }
  },
  error => {
    const response = error.response;
    if (response.status === 401) {
      store.dispatch("resetToken").then(() => {});
    }
    return Promise.reject(error);
  }
);

export default server;
