import request from "@/util/request";

// 添加分类信息
export function addAttribute(data) {
  return request({
    url: "/addAttribute",
    method: "post",
    data
  });
}

export function getAttributeList() {
  return request({
    url: "/getAttributeList",
    method: "get"
  });
}

export function getTypeAttributeList(typeId) {
  return request({
    url: "/getTypeAttributeList",
    method: "get",
    params: {
      typeId
    }
  });
}
