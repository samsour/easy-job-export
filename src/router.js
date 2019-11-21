import Vue from "vue";
import Router from "vue-router";

import PageNotFound from "./views/404";

Vue.use(Router);

const router = new Router({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  mode: "history",
  routes: [
    {
      path: "*",
      name: "Page not found",
      component: PageNotFound
    },

    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "Home",
      component: () => import("./views/Home")
    },
    {
      path: "/new",
      name: "New",
      component: () => import("./views/NewEntry")
    },
    {
      path: "/settings",
      name: "Settings",
      component: () => import("./views/Settings")
    },
    {
      path: "/manage",
      name: "Manage",
      component: () => import("./views/Manage")
    },
    {
      path: "/customer/:id",
      component: () => import("./views/Customer")
    },
    {
      path: "/current-booking",
      component: () => import("./views/CurrentBooking")
    }
  ]
});

export default router;
