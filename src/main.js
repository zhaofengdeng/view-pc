// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";

Vue.config.productionTip = false;

import "../static/project/js/util.js";
import "../static/element/element.util.js"
import '../static/project/css/project.scss';
import '../static/project/css/button.scss';
import 'element-ui/lib/theme-chalk/index.css';
import Menu from "./components/menu.vue";
import SearchFormInput from "./components/search_form/input.vue";
import SearchFormSelect from "./components/search_form/select.vue";

import SearchFormPagination from "./components/search_form/pagination.vue";
Vue.component("v-menu", Menu);
Vue.component("v-search-input", SearchFormInput);
Vue.component("v-search-select", SearchFormSelect);
import { Radio, Checkbox } from "element-ui";
Vue.use(Radio);
Vue.use(Checkbox);
Vue.component("v-pagination", SearchFormPagination);

new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
