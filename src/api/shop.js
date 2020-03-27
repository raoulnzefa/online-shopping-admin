import request from "@/util/request";

// 添加分类信息
export function addShopping(data) {
  return request({
    url: "/addShopping",
    method: "post",
    data
  });
}
