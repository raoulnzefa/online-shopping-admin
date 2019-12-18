import request from "@/util/request";

// 添加分类信息
export function addShopType(data) {
  return request({
    url: "/addShopType",
    method: "post",
    data
  });
}

// 获取所有分类列表
export function getAllShopTypeList(data) {
  return request({
    url: "/getAllShopTypeList",
    method: "get",
    data
  });
}

export function updateShopTypeStatus(data) {
  return request({
    url: "/updateShopTypeStatus",
    method: "put",
    data
  });
}
