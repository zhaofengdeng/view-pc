import Vue from "vue";
import Router from "vue-router";
import home from "@/page/system/user/list";

Vue.use(Router);
const routes = [
  { path: '*', redirect: '/index' },
  {
    path: "",
    name: "",
    component: home
  },
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
