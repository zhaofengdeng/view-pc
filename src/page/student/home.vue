<template>
  <div>
    <v-head></v-head>
    <table class="detail_table">
      <tr>
        <td>学生姓名</td>
        <td>{{student.name}}</td>
        <td>寝室号</td>
        <td>{{student.room.no}}</td>
      </tr>
      <tr>
        <td>寝室分数</td>
        <td>{{student.room.score}}</td>
      </tr>
    </table>
    <div style="width:100%;height:50px;clear:both;">
      <button @click="vacationButtonClick" type="button" class="default" style="float:right">请假</button>
    </div>
    <table class="data_table">
      <thead>
        <tr>
          <th>序号</th>
          <th>标题</th>
          <th>更新时间</th>
          <th>内容</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(model,index) in list">
          <td class="no">{{$refs.pagination.toDataNo(index)}}</td>
          <td>{{model.title}}</td>
          <td>{{model.updatedAt}}</td>
          <td>{{model.msg}}</td>
        </tr>
      </tbody>
    </table>
    <v-pagination ref="pagination" v-model="paginate" @search="search"></v-pagination>
  </div>
</template>
  <script>
export default {
  data() {
    return {
      list: [],
      searchModel: {},
      paginate: {},
      student: { room: {} }
    };
  },
  methods: {
    search(paginate) {
      this.searchModel.paginate = paginate;
      this.post("/notice/search", this.searchModel).then(res => {
        this.list = res.models;
        this.paginate = res.paginate;
      });
    },
    vacationButtonClick() {
      this.$router.push({
        path: "/student/vacation",
        query: { id: this.student.id }
      });
    }
  },
  mounted() {
    this.post("/student/search_by_user_id", {
      userId: this.SessionUtil.get("session_user").id
    }).then(res => {
      this.student = res;
    });
  }
};
</script>