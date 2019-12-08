<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  watch: {
    $route: {
      handler: function(val, oldVal) {
        this.closeAllErrorMsg();
      },
      // 深度观察监听
      deep: true
    }
  }
};
</script>

