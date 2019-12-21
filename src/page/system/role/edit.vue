<template>
  <div>
    <v-menu select="user"></v-menu>
    <table class="edit_table">
      <tr>
        <td>名称</td>
        <td>
          <input type="text" v-model="model.name">
        </td>
        <td>英文</td>
        <td>
          <input type="text" v-model="model.engName">
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

      checkModel: [
        {
          key: "name",
          name: "姓名",
          value: "required"
        },
        {
          key: "engName",
          name: "英文名称",
          value: "required"
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
      this.post("/role/save_or_update", this.model).then(res => {
        this.$router.push({
          path: "/system/role/list"
        });
      });
    }
  },
  mounted() {
    var id = this.$route.query.id;
    if (!this.StringUtil.isNull(id)) {
      this.post("/role/search_by_id", { id: id }).then(res => {
        this.model = res;
      });
    }
  }
};
</script>