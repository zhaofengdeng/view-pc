<template>
  <div>
    <div id="login_div">
      <input type="text" v-model="model.userAccount" placeholder="请输入用户名">
      <input
        type="password"
        v-model="model.userPwd"
        placeholder="请输入密码"
        @keyup.enter="loninButtonClick"
        style="margin-top:20px;"
      >
      <button
        type="button"
        @click="loninButtonClick"
        style="font-weight:bold;margin-top:50px;"
        class="btn btn-lg btn-block btn-primary"
      >登&nbsp;&nbsp;&nbsp;&nbsp;录</button>
    </div>
  </div>
</template>
  <script>
export default {
  data() {
    return {
      model: {}
    };
  },
  methods: {
    loninButtonClick() {
      this.post("/user_login/login", this.model).then(res => {
        this.SessionUtil.set("session_user", res);
        if (res.type == "管理员") {
          this.$router.push({
            path: "/system/user/list"
          });
        } else {
          this.$router.push({
            path: "/student/home"
          });
        }
      });
    }
  }
};
</script>
<style>
#login_div {
  width: 360px;
  height: 337px;
  background-color: rgba(255, 255, 255, 0.5);
  float: right;
  margin-right: 120px;
  margin-top: 200px;
  padding: 50px 25px 0px 25px;
}
</style>
