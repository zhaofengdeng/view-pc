<template>
  <button type="primary" @click="test">弹出框</button>
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
    test() {}
  }
};
</script>