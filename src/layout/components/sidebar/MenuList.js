const menuData = [
  {
    path: "dashboard",
    title: "首页",
    icon: "dashboard"
  },
  {
    path: "user",
    title: "用户管理",
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
    title: "商品管理",
    icon: "shopping",
    children: [
      {
        path: "add",
        title: "添加商品"
      },
      {
        path: "list",
        title: "商品列表"
      },
      {
        path: "attribute/list",
        title: "商品属性"
      },
      {
        path: "parameter/list",
        title: "商品参数"
      }
    ]
  },
  {
    path: "type",
    title: "类型管理",
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
    title: "品牌管理",
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
    path: "store",
    title: "店铺管理",
    icon: "tag",
    children: [
      {
        path: "add",
        title: "添加店铺"
      },
      {
        path: "list",
        title: "店铺列表"
      }
    ]
  },
  {
    path: "order",
    title: "订单管理",
    icon: "ordered-list"
  }
];

export default menuData;
