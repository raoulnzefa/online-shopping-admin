const menuData = [
  {
    path: "dashboard",
    title: "首页",
    icon: "dashboard"
  },
  {
    path: "user",
    title: "用户信息",
    icon: "user",
    children: [
      {
        path: "list",
        title: "用户列表"
      },
      {
        path: "details",
        title: "用户详情"
      }
    ]
  },
  {
    path: "commodity",
    title: "商品信息",
    icon: "shopping",
    children: [
      {
        path: "add",
        title: "添加商品"
      },
      {
        path: "list",
        title: "商品列表"
      }
    ]
  },
  {
    path: "order",
    title: "订单信息",
    icon: "ordered-list"
  }
];

export default menuData;
