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
