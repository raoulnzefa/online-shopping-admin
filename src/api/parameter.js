import request from "@/util/request";

// 添加分类信息
export function addParameter(data) {
  return request({
    url: "/addParameter",
    method: "post",
    data
  });
}

export function getParameterList(typeId) {
  return request({
    url: "/getParameterList",
    method: "get",
    params: {
      typeId
    }
  });
}
