<template>
  <div>
    <v-menu select="user"></v-menu>
    <div class="search_form">
      <div class="head">
        <v-search-input label="账号" v-model="searchModel.account"></v-search-input>
        <v-search-input label="姓名" v-model="searchModel.name"></v-search-input>
        <button @click="search" type="button">查询</button>
      </div>
    </div>
    <table class="data_table">
      <thead>
        <tr>
          <th>序号</th>
          <th>账号</th>
          <th>名称</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(model,index) in list">
          <td>{{$refs.pagination.toDataNo(index)}}</td>
          <td>{{model.account}}</td>
          <td>{{model.name}}</td>
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
      console.log(this.searchModel);
      this.post("/user/search", this.searchModel).then(res => {
        this.list = res.models;
        this.paginate = res.paginate;
      });
    }
  },
  mounted() {}
};
</script>