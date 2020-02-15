<template>
  <div>
    <v-menu select="student"></v-menu>
    <v-head></v-head>
    <div class="search_form">
      <div class="head">
        <v-search-input label="学号" v-model="searchModel.no"></v-search-input>
        <v-search-input label="姓名" v-model="searchModel.name"></v-search-input>
        <div style="width:100%;height:50px;clear:both;">
          <button @click="search" type="button" style="float:right">查询</button>
          <button @click="blankButtonClick" type="button" class="default" style="float:right">新增</button>
        </div>
      </div>
    </div>
    <table class="data_table">
      <thead>
        <tr>
          <th>序号</th>
          <th>学号</th>
          <th>姓名</th>
          <th>班级</th>
          <th>性别</th>
          <th>手机号</th>
          <th>地址</th>
          <th>编辑</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(model,index) in list">
          <td class="no">{{$refs.pagination.toDataNo(index)}}</td>
          <td>{{model.no}}</td>
          <td>{{model.name}}</td>
          <td>{{model.clazz}}</td>
          <td>{{model.sex}}</td>
          <td>{{model.phone}}</td>
          <td>{{model.address}}</td>
          <td class="button">
            <button @click="editButtonClick(model)">编辑</button>
            <!--  <button @click="vacationButtonClick(model)">请假/销假</button>
            <button @click="detailButtonClick(model)">详细</button>-->
          </td>
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
      paginate: {}
    };
  },
  methods: {
    search(paginate) {
      this.searchModel.paginate = paginate;
      this.post("/student/search", this.searchModel).then(res => {
        this.list = res.models;
        this.paginate = res.paginate;
      });
    },
    blankButtonClick() {
      this.$router.push({
        path: "/system/student/edit"
      });
    },
    editButtonClick(model) {
      this.$router.push({
        path: "/system/student/edit",
        query: { id: model.id }
      });
    },
    vacationButtonClick(model) {
      this.$router.push({
        path: "/system/student/vacation",
        query: { id: model.id }
      });
    },
    detailButtonClick(model) {
      this.$router.push({
        path: "/system/student/detail",
        query: { id: model.id }
      });
    }
  },
  mounted() {}
};
</script>