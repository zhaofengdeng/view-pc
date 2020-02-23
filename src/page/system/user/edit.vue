<template>
  <div>
    <v-menu select="user"></v-menu>
    <v-head></v-head>
    <div class="edit_table_page">
      <table class="edit_table">
        <tr>
          <td>账号</td>
          <td>
            <input type="text" v-model="model.account">
          </td>
          <td>姓名</td>
          <td>
            <input type="text" v-model="model.name">
          </td>
        </tr>
        <tr>
          <td>手机号</td>
          <td>
            <input type="text" v-model="model.phone">
          </td>
          <td>状态</td>
          <td>
            <el-radio-group v-model="model.type">
              <el-radio label="消费者">消费者</el-radio>
              <el-radio label="餐厅管理员">餐厅管理员</el-radio>
              <el-radio label="管理员">管理员</el-radio>
            </el-radio-group>
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
      model: {
        enable: true,
        type: "消费者"
      },
      checkModel: [
        {
          key: "name",
          name: "姓名",
          value: "required",
          maxLength: 100
        },
        {
          key: "account",
          name: "账号",
          value: "required",
          maxLength: 100
        },
        {
          key: "phone",
          name: "手机号",
          value: "required",
          maxLength: 100
        }
      ]
    };
  },
  methods: {
    updateButtonClick() {
      var flag = this.check(this.model, this.checkModel);
      if (!flag) {
        return;
      }
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