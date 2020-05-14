import Vue from "vue";
import Router from "vue-router";
import { getToken } from "../util/cookies";
import Layout from "@/layout";

const whiteList = ["/login"];

Vue.use(Router);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue")
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        component: () => import("@/views/dashboard/index.vue")
      },
      {
        path: "/user/list",
        component: () => import("@/views/user/list/index.vue")
      },
      {
        path: "/user/details",
        component: () => import("@/views/user/details/index.vue")
      },
      {
        path: "/commodity/add",
        component: () => import("@/views/commodity/add/index.vue")
      },
      {
        path: "/commodity/list",
        component: () => import("@/views/commodity/list/index.vue")
      },
      {
        path: "/commodity/attribute/list",
        component: () => import("@/views/commodity/attribute/list/index.vue")
      },
      {
        path: "/commodity/attribute/add/:typeId",
        name: "attributeadd",
        component: () => import("@/views/commodity/attribute/add/index.vue")
      },
      {
        path: "/commodity/attribute/update/:id/:typeId",
        name: "attributeupdate",
        component: () => import("@/views/commodity/attribute/update/index.vue")
      },
      {
        path: "/commodity/attribute/children/:id",
        name: "attributelist",
        component: () =>
          import("@/views/commodity/attribute/children/index.vue")
      },
      {
        path: "/commodity/parameter/list",
        component: () => import("@/views/commodity/parameter/list/index.vue")
      },
      {
        path: "/commodity/parameter/add/:typeId",
        name: "parameteradd",
        component: () => import("@/views/commodity/parameter/add/index.vue")
      },
      {
        path: "/commodity/parameter/update/:id/:typeId",
        name: "parameterupdate",
        component: () => import("@/views/commodity/parameter/update/index.vue")
      },
      {
        path: "/commodity/parameter/children/:id",
        name: "parameterlist",
        component: () =>
          import("@/views/commodity/parameter/children/index.vue")
      },
      {
        path: "/type/add",
        component: () => import("@/views/type/add/index.vue")
      },
      {
        path: "/type/list",
        component: () => import("@/views/type/list/index.vue")
      },
      {
        path: "/brand/add",
        component: () => import("@/views/brand/add/index.vue")
      },
      {
        path: "/brand/list",
        component: () => import("@/views/brand/list/index.vue")
      },
      {
        path: "/store/add",
        component: () => import("@/views/store/add/index.vue")
      },
      {
        path: "/store/update/:id",
        name: "storeupdate",
        component: () => import("@/views/store/update/index.vue")
      },
      {
        path: "/store/list",
        component: () => import("@/views/store/list/index.vue")
      },
      {
        path: "/order",
        component: () => import("@/views/order/list/index.vue")
      }
    ]
  },

  {
    path: "*",
    redirect: "/"
  }
];

const route = new Router({
  mode: "history",
  routes
});

route.beforeEach((to, from, next) => {
  if (getToken()) {
    next();
  } else {
    // 白名单路径不需要重定向到登录页
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next({ path: "/login" });
    }
  }
});

export default route;
