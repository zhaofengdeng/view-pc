<template>
  <div>
    <v-menu select="notice"></v-menu>
    <v-head></v-head>
    <div class="search_form">
      <div class="head">
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
          <th>标题</th>
          <th>更新时间</th>
          <th>内容</th>
          <th>编辑</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(model,index) in list">
          <td class="no">{{$refs.pagination.toDataNo(index)}}</td>
          <td>{{model.title}}</td>
          <td>{{model.updatedAt}}</td>
          <td>{{model.msg}}</td>
          <td class="button">
            <button @click="editButtonClick(model)">编辑</button>
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
      this.post("/notice/search", this.searchModel).then(res => {
        this.list = res.models;
        this.paginate = res.paginate;
      });
    },
    blankButtonClick() {
      this.$router.push({
        path: "/system/notice/edit"
      });
    },
    editButtonClick(model) {
      this.$router.push({
        path: "/system/notice/edit",
        query: { id: model.id }
      });
    },

    deleteButtonClick(model) {
      this.post("/notice/delete", { id: model.id }).then(res => {
        this.search();
      });
    }
  },
  mounted() {}
};
</script>