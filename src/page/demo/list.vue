<template>
  <div>
    <v-menu select="demoList"></v-menu>
    <div class="search_form">
      <div class="head">
        <v-search-input label="账号" v-model="searchModel.account"></v-search-input>
        <v-search-select
          label="下拉列表"
          optionKey="id"
          optionLabel="name"
          v-model="searchModel.name"
          :objects="selects"
        ></v-search-select>
      </div>
    </div>
    <table class="data_table">
      <thead>
        <tr>
          <th>序号</th>
          <th>姓名</th>
          <th>手机号</th>
          <th>名称</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="model in list">
          <td>1</td>
          <td>赵丰登</td>
          <td>182*****</td>
          <td>赵丰登</td>
        </tr>
      </tbody>
    </table>
    <v-pagination v-model="paginationForm" @search="a"></v-pagination>
  </div>
</template>
  <script>
export default {
  name: "HelloWorld",
  data() {
    return {
      searchModel: {},
      selects: [
        { id: "1", name: "测试1" },
        { id: "2", name: "测试2" },
        { id: "3", name: "测试3" }
      ],
      paginationForm: { total: 0 },
      list: [{}, {}, {}, {}, {}],
      searchForm: {},
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods: {
    a(model) {
      this.searchForm.paginationCurPage = model.paginationCurPage;
      this.searchForm.paginationPageSize = model.paginationPageSize;
      //this.search();
    }
  }
};
</script>