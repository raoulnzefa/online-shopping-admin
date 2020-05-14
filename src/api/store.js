import request from "@/util/request";

// 添加分类信息
export function addStore(data) {
  return request({
    url: "/addStore",
    method: "post",
    data
  });
}

// 获取店铺列表
export function getStoreList(data) {
  return request({
    url: "/getStoreList",
    method: "get",
    data
  });
}

// 根据id获取商铺
export function getStore(id) {
  return request({
    url: "/getStore",
    method: "get",
    params: {
      id
    }
  });
}

// 修改店铺信息
export function updateStore(data) {
  return request({
    url: "/updateStore",
    method: "post",
    data
  });
}

// 修改店铺状态
export function updateStoreStatus(id, status) {
  return request({
    url: "/updateStore",
    method: "post",
    params: {
      id,
      status
    }
  });
}
