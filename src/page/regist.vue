<template>
  <div>
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
          <td>年龄</td>
          <td>
            <input type="number" v-model="model.age">
          </td>
        </tr>
        <tr>
          <td>性别</td>
          <td>
            <el-radio-group v-model="model.sex">
              <el-radio label="男">男</el-radio>
              <el-radio label="女">女</el-radio>
            </el-radio-group>
          </td>
          <td>地址</td>
          <td>
            <input type="text" v-model="model.address">
          </td>
        </tr>
      </table>
      <div class="edit_button_group">
        <button type="button" @click="updateButtonClick">注册</button>
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
          maxLength: 11
        },
        {
          key: "sex",
          name: "性别",
          value: "required",
          maxLength: 11
        },
        {
          key: "age",
          name: "年龄",
          value: "required",
          maxLength: 11
        },
        {
          key: "address",
          name: "住址",
          value: "required",
          maxLength: 50
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
      this.post("/user_login/regist", this.model).then(res => {
        this.alert(res).then(res => {
          this.$router.push({
            path: "/login"
          });
        });
      });
    }
  },
  mounted() {}
};
</script>