<template>
  <div>
    <v-menu select="user"></v-menu>
    <v-head></v-head>
    <div class="edit_table_page">
      <table class="edit_table">
        <tr>
          <td>账号</td>
          <td>{{model.account}}</td>
          <td>姓名</td>
          <td>{{model.name}}</td>
        </tr>
        <tr>
          <td>手机号</td>
          <td>{{model.phone}}</td>
          <td>年龄</td>
          <td>{{model.age}}</td>
        </tr>
        <tr>
          <td>性别</td>
          <td>{{model.sex}}</td>
          <td>地址</td>
          <td>{{model.address}}</td>
        </tr>
        <tr>
          <td>余额</td>
          <td>{{model.money}}</td>
          <td>充值</td>
          <td>
            <input type="number" v-model="money">
          </td>
        </tr>
      </table>
      <div class="edit_button_group">
        <button type="button" @click="updateButtonClick">更新</button>
        <button type="button" @click="$router.go(-1);" class="default">返回</button>
      </div>
    </div>
  </div>
</template>
  <script>
export default {
  data() {
    return {
      model: {},
      money: null
    };
  },
  methods: {
    updateButtonClick() {
      if (this.StringUtil.isNull(this.money)) {
        this.showErrorMsg("请输入充值金额");
        return;
      }
      this.model.addMoney = this.money;
      this.post("/user/save_or_update", this.model).then(res => {
        this.$router.push({
          path: "/system/user/list"
        });
      });
    }
  },
  mounted() {
    var id = this.$route.query.id;
    if (!this.StringUtil.isNull(id)) {
      this.post("/user/search_by_id", { id: id }).then(res => {
        this.model = res;
      });
    }
  }
};
</script>