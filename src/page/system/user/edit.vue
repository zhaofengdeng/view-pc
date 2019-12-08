<template>
    <div>
        <v-menu select="user"></v-menu>
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
      }
    };
  },
  methods: {
    updateButtonClick() {
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