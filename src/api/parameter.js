import request from "@/util/request";

// 添加分类信息
export function addParameter(data) {
  return request({
    url: "/addParameter",
    method: "post",
    data
  });
}

export function getParameterList(data) {
  return request({
    url: "/getParameterList",
    method: "get",
    data
  });
}
