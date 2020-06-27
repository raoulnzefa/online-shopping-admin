import request from "@/util/request";

// 添加分类信息
export function addBrand(data) {
  return request({
    url: "/addBrand",
    method: "post",
    data
  });
}

// 修改品牌信息
export function editBrand(data) {
  return request({
    url: "/editBrand",
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

export function getBrand(id) {
  return request({
    url: "/getBrand",
    method: "get",
    params: {
      id
    }
  });
}

export function removeBrandPic(data) {
  return request({
    url: "/removeBrandPic",
    method: "post",
    data
  });
}

export function removeBrand(id) {
  return request({
    url: "/removeBrand",
    method: "post",
    data: {
      id
    }
  });
}
