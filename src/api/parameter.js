import request from "@/util/request";

// 添加分类信息
export function addParameter(data) {
  return request({
    url: "/addParameter",
    method: "post",
    data
  });
}

//根据类型id获取参数集合
export function getParameterList(typeId) {
  return request({
    url: "/getParameterList",
    method: "get",
    params: {
      typeId
    }
  });
}

// 根据参数id修改参数信息
export function updateParameter(data) {
  return request({
    url: "/updateParameter",
    method: "post",
    data
  });
}

// 根据参数id获取参数信息
export function getParameter(id) {
  return request({
    url: "/getParameter",
    method: "get",
    params: {
      id
    }
  });
}

//删除某条参数
export function removeParameter(id) {
  return request({
    url: "/removeParameter",
    method: "post",
    params: {
      id
    }
  });
}
