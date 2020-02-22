<template >
  <div class="menu">
    <el-menu
      :default-active="activeIndex"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <template v-for="menu in menus">
        {{menu.isMenus}}
        <template v-if="menu.menus==undefined">
          <el-menu-item :index="menu.index" @click="toPage(menu.url)">{{menu.name}}</el-menu-item>
        </template>
        <template v-else>
          <el-submenu :index="menu.index">
            <template slot="title">{{menu.name}}</template>
            <template v-for="sonMenu in menu.menus">
              <el-menu-item :index="sonMenu.index" @click="toPage(sonMenu.url)">{{sonMenu.name}}</el-menu-item>
            </template>
          </el-submenu>
        </template>
      </template>
    </el-menu>
  </div>
</template>
  <script>
import MenuJs from "../../static/project/js/global.menu.js";
import { Menu, MenuItem, Submenu } from "element-ui";
import Vue from "vue";
Vue.component(Menu.name, Menu);

Vue.component(MenuItem.name, MenuItem);
Vue.component(Submenu.name, Submenu);
export default {
  props: ["select", "SoMenuSelect"],
  data() {
    return {
      activeIndex: "",
      activeSoMenuIndex: "",
      menus: [],
      indexTask: "taskList"
    };
  },
  methods: {
    toPage(url) {
      this.$router.push({ path: url, query: {} });
    }
  },

  mounted() {
    this.activeIndex = this.select;
    this.activeSoMenuIndex = this.SoMenuSelect;
  },
  created() {
    if (this.SessionUtil.get("session_user").type == "顾客") {
      this.menus = MenuJs.menus2;
    } else {
      this.menus = MenuJs.menus;
    }
  },
  task() {}
};
</script>
<style>
.el-menu {
  border: 0px;
}
.menu {
  left: 0px;
  top: 0;
  width: 200px;
  height: 100%;
  position: fixed;
  background-color: #545c64;
}
#app {
  padding-left: 220px;
}
</style>
