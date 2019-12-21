<template>
  <div>
    <v-menu select="permissionController"></v-menu>
    <div class="search_form">
      <div class="head">
        <v-search-input label="url" v-model="searchModel.url"></v-search-input>
        <v-search-input label="名称" v-model="searchModel.name"></v-search-input>
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
          <th>名称</th>
          <th>url</th>
          <th>排序值</th>
          <th>创建时间</th>
          <th>更新时间</th>
          <th>编辑</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(model,index) in list">
          <td class="no">{{$refs.pagination.toDataNo(index)}}</td>
          <td>{{model.name}}</td>
          <td>{{model.url}}</td>
          <td>{{model.sort}}</td>
          <td>{{model.insertedAt}}</td>
          <td>{{model.updatedAt}}</td>
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
      this.post("/permission_controller/search", this.searchModel).then(res => {
        this.list = res.models;
        this.paginate = res.paginate;
      });
    },
    blankButtonClick() {
      this.$router.push({
        path: "/system/permission_controller/edit"
      });
    },
    editButtonClick(model) {
      this.$router.push({
        path: "/system/permission_controller/edit",
        query: { id: model.id }
      });
    },
    detailButtonClick(model) {
      this.$router.push({
        path: "/system/permission_controller/detail",
        query: { id: model.id }
      });
    }
  },
  mounted() {}
};
</script>