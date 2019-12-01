<template>
  <van-button type="primary" @click="test">弹出框</van-button>
</template>
  <script>
import { Dialog } from "vant";

export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods: {
    test() {
      Dialog.alert({
        title: "标题",
        message: "弹窗内容"
      }).then(() => {
        // on close
      });
    }
  }
};
</script>