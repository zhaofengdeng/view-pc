<template>
  <div>
    <v-menu select="student"></v-menu>
    <v-head></v-head>
    <table class="detail_table">
      <tr>
        <td>学号</td>
        <td>{{model.no}}</td>
        <td>姓名</td>
        <td>{{model.name}}</td>
      </tr>
      <tr>
        <td>班级</td>
        <td>{{model.clazz}}</td>
        <td>性别</td>
        <td>{{model.sex}}</td>
      </tr>
      <tr>
        <td>手机号</td>
        <td>{{model.phone}}</td>
        <td>地址</td>
        <td>{{model.address}}</td>
      </tr>
    </table>
    <table class="edit_table">
      <tr>
        <td>请假日期</td>
        <td>
          <input type="date" v-model="vacationModel.no">
        </td>
        <td>请假原因</td>
        <td>
          <input type="text" v-model="vacationModel.name">
        </td>
      </tr>
    </table>
  </div>
</template>
  <script>
export default {
  data() {
    return {
      model: {},
      vacationModel: {}
    };
  },
  methods: {},
  mounted() {
    var id = this.$route.query.id;
    if (!this.StringUtil.isNull(id)) {
      this.post("/student/search_by_id", { id: id }).then(res => {
        this.model = res;
      });
    }
  }
};
</script>