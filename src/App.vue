<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        this.closeAllErrorMsg();
        var curPath = val.path;
        var lastPath = oldVal.path;
        var model = {
          path: curPath,
          lastPath: lastPath,
          query: JSON.stringify(val.query),
          id: localStorage.getItem("lastPageLogId")
        };

        //记录日志
        this.post("/log/page/end", model).then(res => {});
        this.post("/log/page/begin", model).then(res => {
          localStorage.setItem("lastPageLogId", res.id);
        });
      },
      // 深度观察监听
      deep: true
    }
  }
};
</script>

