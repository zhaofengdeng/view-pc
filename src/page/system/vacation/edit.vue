<template>
  <div>
    <v-menu select="vacation"></v-menu>
    <v-head></v-head>
    <table class="edit_table">
      <tr>
        <td>姓名</td>
        <td>{{model.student.name}}</td>
        <td>学号</td>
        <td>{{model.student.no}}</td>
      </tr>
      <tr>
        <td>销假时间</td>
        <td>
          <input type="date" v-model="model.endDate">
        </td>
      </tr>
    </table>
    <button type="button" @click="updateButtonClick">销假</button>
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
          key: "endDate",
          name: "销假时间",
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
      this.model.status = 2;
      this.post("/vacation/save_or_update", this.model).then(res => {
        this.$router.push({
          path: "/system/vacation/list"
        });
      });
    }
  },
  mounted() {
    var id = this.$route.query.id;
    if (!this.StringUtil.isNull(id)) {
      this.post("/vacation/search_by_id", { id: id }).then(res => {
        this.model = res;
      });
    }
  }
};
</script>