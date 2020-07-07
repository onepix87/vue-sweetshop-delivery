// import store from "../store";

import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/product/:id",
    name: "Product",
    component: () => import("../views/Product")
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart")
  },
  {
    path: "/registration",
    name: "Registration",
    component: () => import("../views/Rigistration")
  },
  {
    path: "/history",
    name: "History",
    meta: { 
      requiresLogin: true,
      role: '2',
      },
    component: () => import("../views/History")
  },
  {
    path: "/admin",
    name: "AdminHome",
    meta: { 
      requiresLogin: true,
      role: '0',
      },
    component: () => import("../views/Admin/index")
  },
  {
    path: "/admin/items",
    name: "AdminProductList",
    meta: { 
      requiresLogin: true,
      role: '0',
      },
    component: () => import("../views/Admin/index")
  },
  {
    path: "/admin/items/:id",
    name: "AdminEditProduct",
    meta: { 
      requiresLogin: true,
      role: '0',
      },
    component: () => import("../views/Admin/AdminProduct/AdminProductEdit")
  },
  {
    path: "/admin/add",
    name: "AdminAddProduct",
    meta: { 
      requiresLogin: true,
      role: '0',
      },
    component: () => import("../views/Admin/index")
  },
  {
    path: "/admin/orders",
    name: "AdminOrderList",
    meta: { 
      requiresLogin: true,
      role: '0',
      },
    component: () => import("../views/Admin/index")
  },
  {
    path: "/delivery/active-orders",
    name: "CurrentDeliveryOrders",
    meta: { 
      requiresLogin: true,
      role: '1',
      },
    component: () => import ("../views/CurrentDeliveryOrders")
  },
  {
    path: "/delivery/my-orders",
    name: "DeliveryGuyOrders",
    meta: { 
      requiresLogin: true,
      role: '1',
      },
    component: () => import ("../views/DeliveryGuyOrdersPage")
  }
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
/*  if (to.meta.requiresLogin && !localStorage.getItem("isLoggedIn")) {
    next("/");
  } else {
    next();
  }*/

  if (to.meta.role && localStorage.getItem("roleId") !== to.meta.role) {
    next("/");
  } else {
    next();
  }
});

export default router;
