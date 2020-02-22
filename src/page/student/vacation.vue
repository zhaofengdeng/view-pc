<template>
  <div>
    <v-head></v-head>
    <div class="edit_table_page">
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
      <table class="edit_table" style="margin-top:50px;">
        <tr>
          <td>请假日期</td>
          <td>
            <input type="date" v-model="vacationModel.beginDate">
          </td>
          <td>请假原因</td>
          <td>
            <input type="text" v-model="vacationModel.content">
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
      checkModel: [
        {
          key: "beginDate",
          name: "请假日期 ",
          value: "required",
          maxLength: 100
        },
        {
          key: "content",
          name: "请假原因",
          value: "required",
          maxLength: 200
        }
      ],
      vacationModel: { status: 1 }
    };
  },
  methods: {
    updateButtonClick() {
      var flag = this.check(this.vacationModel, this.checkModel);
      if (!flag) {
        return;
      }
      this.vacationModel.studentId = this.model.id;
      this.post("/vacation/save_or_update", this.vacationModel).then(res => {
        this.$router.go(-1);
      });
    }
  },
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