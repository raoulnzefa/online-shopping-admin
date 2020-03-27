import request from "@/util/request";

// 添加属性信息
export function addAttribute(data) {
  return request({
    url: "/addAttribute",
    method: "post",
    data
  });
}

// 修改属性信息
export function updateAttriubte(data) {
  return request({
    url: "/updateAttribute",
    method: "post",
    data
  });
}

// 根据id获取单个属性信息
export function getAttribute(id, typeId) {
  return request({
    url: "/getAttribute",
    method: "get",
    params: {
      typeId,
      id
    }
  });
}

// 获取某个类型下的属性信息
export function getTypeAttributeList(typeId) {
  return request({
    url: "/getTypeAttributeList",
    method: "get",
    params: {
      typeId
    }
  });
}

export function removeAttribute(data) {
  return request({
    url: "/removeAttribute",
    method: "post",
    data
  });
}
