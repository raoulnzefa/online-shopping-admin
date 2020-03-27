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
