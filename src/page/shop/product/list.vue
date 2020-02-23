<template>
  <div>
    <v-menu select="product"></v-menu>
    <v-head></v-head>
    <div class="search_form">
      <div class="head">
        <v-search-input label="名称" v-model="searchModel.name"></v-search-input>
        <v-search-input label="楼层" v-model="searchModel.type1"></v-search-input>
        <v-search-input label="窗口" v-model="searchModel.type2"></v-search-input>
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
          <th>售价</th>
          <th>楼层</th>
          <th>窗口</th>
          <th>数量</th>
          <th>已售</th>
          <th>库存量</th>
          <th>编辑</th>
          <th>查看评论</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(model,index) in list">
          <td class="no">{{$refs.pagination.toDataNo(index)}}</td>
          <td>{{model.name}}</td>
          <td>{{model.money}}</td>
          <td>{{model.type1}}</td>
          <td>{{model.type2}}</td>
          <td>{{model.allQty}}</td>
          <td>{{model.sellQty}}</td>
          <td>{{model.allQty-model.sellQty}}</td>
          <td>
            <button @click="editButtonClick(model)">修改</button>
            <button @click="deleteButtonClick(model)">删除</button>
          </td>
          <td>
            <button @click="viewButtonClick(model)">查看</button>
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
      paginate: {},
      addBookId: null,
      addBookQty: null,
      addBookDialogFlag: false
    };
  },
  methods: {
    search(paginate) {
      this.searchModel.paginate = paginate;
      this.post("/product/search", this.searchModel).then(res => {
        this.list = res.models;
        this.paginate = res.paginate;
      });
    },
    blankButtonClick() {
      this.$router.push({
        path: "/shop/product/edit"
      });
    },
    deleteButtonClick(model) {
      this.post("/product/save_or_update", {
        id: model.id,
        deleted: true
      }).then(res => {
        this.search();
      });
    },
    editButtonClick(model) {
      this.$router.push({
        path: "/shop/product/edit",
        query: { id: model.id }
      });
    },
    viewButtonClick(model) {
      this.$router.push({
        path: "/shop/product/detail",
        query: { id: model.id }
      });
    }
  },
  mounted() {}
};
</script>