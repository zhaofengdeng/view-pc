<template>
  <div>
    <v-menu select="demo"></v-menu>
    <button type="primary" @click="showAlert">弹出框</button>
    <button type="primary" @click="showConfirm">确认框</button>
  </div>
</template>
  <script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods: {
    showAlert() {
      this.alert("alert 就是这么使用的").then(res => {
        console.log(res);
        console.log("=============ds");
      });
    },
    showConfirm() {
      this.confirm("确认是否删除").then(res => {
        console.log(res);
      });
    }
  }
};
</script>