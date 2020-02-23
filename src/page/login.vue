<template>
  <div id="main">
    <div id="login_div">
      <input
        type="text"
        v-model="model.userAccount"
        style="margin-top:20px;width:90%;"
        placeholder="请输入账号"
      >
      <input
        type="password"
        v-model="model.userPwd"
        placeholder="请输入密码"
        @keyup.enter="loninButtonClick"
        style="margin-top:20px;width:90%;"
      >
      <button
        type="button"
        @click="loninButtonClick"
        style="font-weight:bold;width:calc(90% + 30px) ;margin:30px 0px;"
        class="btn btn-lg btn-block btn-primary"
      >登&nbsp;&nbsp;&nbsp;&nbsp;录</button>
    </div>
  </div>
</template>
<style scoped>
input {
  height: 40px;
  padding-left: 15px;
  border-radius: 5px;
}
#main {
  width: calc(100% + 220px);
  margin-left: -220px;
  height: 100%;
  background-image: url(/static/project/images/bg.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
#login_div {
  width: 360px;
  height: 388px;
  background-color: rgba(255, 255, 255, 0.5);
  float: right;
  margin-right: 120px;
  margin-top: 200px;
  padding: 50px 25px 0px 25px;
}
</style>

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
          return;
        }
        if (res.type == "餐厅管理员") {
          this.$router.push({
            path: "/shop/product/list"
          });
          return;
        } else {
          this.$router.push({
            path: "/customer/home"
          });
        }
      });
    },
    registButtonClick() {
      this.$router.push({
        path: "/regist"
      });
    }
  }
};
</script>

