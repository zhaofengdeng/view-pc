<template>
  <div>
    <v-menu select="vacation"></v-menu>
    <v-head></v-head>
    <div class="search_form">
      <div class="head">
        <v-search-input label="学号" v-model="searchModel.no"></v-search-input>
        <v-search-input label="姓名" v-model="searchModel.name"></v-search-input>
        <div style="width:100%;height:50px;clear:both;">
          <button @click="search" type="button" style="float:right">查询</button>
        </div>
      </div>
    </div>
    <table class="data_table">
      <thead>
        <tr>
          <th>序号</th>
          <th>学号</th>
          <th>姓名</th>
          <th>请假时间</th>
          <th>请假原因</th>
          <th>销假时间</th>
          <th>状态</th>
          <th>编辑</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(model,index) in list">
          <td class="no">{{$refs.pagination.toDataNo(index)}}</td>
          <td>{{model.student.no}}</td>
          <td>{{model.student.name}}</td>
          <td>{{model.beginDate}}</td>
          <td>{{model.content}}</td>
          <td>{{model.endDate}}</td>
          <td class="status">{{model.statusText}}</td>
          <td class="button">
            <button @click="editButtonClick(model)" v-if="model.status==1">销假</button>
            <button @click="deleteButtonClick(model)">删除</button>
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
      this.post("/vacation/search", this.searchModel).then(res => {
        this.list = res.models;
        this.paginate = res.paginate;
      });
    },
    deleteButtonClick(model) {
      this.post("/vacation/delete", { id: model.id }).then(res => {
        this.search();
      });
    },
    editButtonClick(model) {
      this.$router.push({
        path: "/system/vacation/edit",
        query: { id: model.id }
      });
    }
  },
  mounted() {}
};
</script>