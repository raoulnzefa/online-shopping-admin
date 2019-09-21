import Cookies from "js-cookie";

const tokenKey = "token";
const name = "name";

export function getToken() {
  return Cookies.get(tokenKey);
}

export function setToken(token) {
  return Cookies.set(tokenKey, token, { expires: 7 });
}

export function removeToken() {
  return Cookies.remove(tokenKey);
}

export function getUserName() {
  return Cookies.get(name);
}

export function setUserName(userName) {
  return Cookies.set(name, userName, { expires: 30 });
}

export function removeUserName() {
  return Cookies.remove(name);
}
