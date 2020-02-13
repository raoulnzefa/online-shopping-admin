import request from "@/util/request";

// 添加分类信息
export function addBrand(data) {
  return request({
    url: "/addBrand",
    method: "post",
    data
  });
}

export function getBrandList(data) {
  return request({
    url: "/getBrandList",
    method: "get",
    data
  });
}

export function getTypeBrandList(typeId) {
  return request({
    url: "/getTypeBrandList",
    method: "get",
    params: {
      typeId
    }
  });
}
