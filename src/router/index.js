import Vue from "vue";
import Router from "vue-router";
import demo from "@/page/demo";

import demo_list from "@/page/demo/list";
import system_user_list from "@/page/system/user/list";

import system_user_detail from "@/page/system/user/detail";

import system_user_edit from "@/page/system/user/edit";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/demo",
      name: "demo",
      component: demo
    },
    {
      path: "/demo/list",
      name: "demo_list",
      component: demo_list
    },
    {
      path: "/",
      name: "demo",
      component: demo
    }
    ,
    {
      path: "/system/user/list",
      name: "system_user_list",
      component: system_user_list
    }
    ,
    {
      path: "/system/user/detail",
      name: "system_user_detail",
      component: system_user_detail
    }
    ,
    {
      path: "/system/user/edit",
      name: "system_user_edit",
      component: system_user_edit
    }
  ]
});
