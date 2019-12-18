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
    path: "type",
    title: "类型信息",
    icon: "tag",
    children: [
      {
        path: "add",
        title: "添加类型"
      },
      {
        path: "list",
        title: "类型列表"
      }
    ]
  },
  {
    path: "brand",
    title: "品牌信息",
    icon: "tag",
    children: [
      {
        path: "add",
        title: "添加品牌"
      },
      {
        path: "list",
        title: "品牌列表"
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
