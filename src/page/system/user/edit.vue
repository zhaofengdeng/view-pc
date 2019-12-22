<template>
  <div>
    <v-menu select="user"></v-menu>
    <v-head></v-head>
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
        <td>邮箱</td>
        <td>
          <input type="text" v-model="model.email">
        </td>
        <td>状态</td>
        <td>
          <el-radio-group v-model="model.enable">
            <el-radio :label="true">启用</el-radio>
            <el-radio :label="false">停用</el-radio>
          </el-radio-group>
        </td>
      </tr>
      <tr>
        <td>角色</td>
        <td>
          <el-checkbox-group v-model="selectRoles">
            <el-checkbox v-for="role in roles" :label="role.id" :key="role.id">{{role.name}}</el-checkbox>
          </el-checkbox-group>
        </td>
      </tr>
    </table>
    <button type="button" @click="updateButtonClick">更新</button>
    <button type="button" @click="$router.go(-1);" class="default">返回</button>
  </div>
</template>
  <script>
export default {
  data() {
    return {
      model: {
        enable: true
      },

      selectRoles: [],
      roles: [],
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
          key: "email",
          name: "邮箱",
          value: "required,email",
          maxLength: 100
        },
        {
          key: "roleIds",
          name: "角色",
          minLength: 1
        }
      ]
    };
  },
  methods: {
    updateButtonClick() {
      this.model.roleIds = this.selectRoles;
      var flag = this.check(this.model, this.checkModel);
      if (!flag) {
        return;
      }
      this.post("/user/save_or_update", this.model).then(res => {
        this.$router.push({
          path: "/system/user/list"
        });
      });
    },
    loadRoles() {
      this.post("/role/search_all", this.model).then(res => {
        this.roles = res;
      });
    }
  },
  mounted() {
    this.loadRoles();
    var id = this.$route.query.id;
    if (!this.StringUtil.isNull(id)) {
      this.post("/user/search_by_id", { id: id }).then(res => {
        this.model = res;
        for (var i = 0; i < res.roles.length; i++) {
          this.selectRoles.push(res.roles[i].id);
        }
      });
    }
  }
};
</script>