import request from "@/util/request";

export function login(data) {
  return request({
    url: "/login/internal",
    method: "post",
    data
  });
}

export function getUserInfo(userId) {
  return request({
    url: "/userInfo",
    method: "get",
    params: {
      userId
    }
  });
}
