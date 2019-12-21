import Vue from "vue";
import Router from "vue-router";
import demo from "@/page/demo";

import demo_list from "@/page/demo/list";
import demo_detail from "@/page/demo/detail";
import demo_edit from "@/page/demo/edit";

import system_user_list from "@/page/system/user/list";

import login from "@/page/login";

import system_user_detail from "@/page/system/user/detail";

import system_user_edit from "@/page/system/user/edit";
Vue.use(Router);
const routes = [
  { path: '*', redirect: '/index' }
];
importPages(require.context('../page', true, /\.vue$/, 'lazy'))
function importPages(r) {
  r.keys().forEach(key => {
    routes.push({ path: (key.split('.'))[1], component: () => r(key) })
  });
}

export default new Router({
  routes: routes
});
