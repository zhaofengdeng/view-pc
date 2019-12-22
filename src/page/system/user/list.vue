<template>
  <div>
    <v-menu select="user"></v-menu>
    <v-head></v-head>
    <div class="search_form">
      <div class="head">
        <v-search-input label="账号" v-model="searchModel.account"></v-search-input>
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
          <th>账号</th>
          <th>名称</th>
          <th>邮箱</th>
          <th>状态</th>
          <th>编辑</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(model,index) in list">
          <td class="no">{{$refs.pagination.toDataNo(index)}}</td>
          <td>{{model.account}}</td>
          <td>{{model.name}}</td>
          <td>{{model.email}}</td>
          <td class="status">{{model.enable | format('user.enable')}}</td>
          <td class="button">
            <button @click="editButtonClick(model)">编辑</button>
            <button @click="detailButtonClick(model)">详细</button>
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
      this.post("/user/search", this.searchModel).then(res => {
        this.list = res.models;
        this.paginate = res.paginate;
      });
    },
    blankButtonClick() {
      this.$router.push({
        path: "/system/user/edit"
      });
    },
    editButtonClick(model) {
      this.$router.push({
        path: "/system/user/edit",
        query: { id: model.id }
      });
    },
    detailButtonClick(model) {
      this.$router.push({
        path: "/system/user/detail",
        query: { id: model.id }
      });
    }
  },
  mounted() {}
};
</script>