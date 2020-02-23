<template>
  <div>
    <v-menu select="product"></v-menu>
    <v-head></v-head>
    <table class="data_table">
      <thead>
        <tr>
          <th>序号</th>
          <th>名称</th>
          <th>楼层</th>
          <th>窗口</th>
          <th>分数</th>
          <th>评论内容</th>
          <th>时间</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(model,index) in list">
          <td class="no">{{index+1}}</td>
          <td>{{model.product.name}}</td>
          <td>{{model.product.type1}}</td>
          <td>{{model.product.type2}}</td>
          <td>{{model.score}}</td>
          <td>{{model.comment}}</td>
          <td>{{model.insertedAt}}</td>
        </tr>
      </tbody>
    </table>
    <v-pagination ref="pagination" v-model="paginate" @search="search"></v-pagination>
    <div class="detail_button_group">
      <button type="button" @click="$router.go(-1);" class="default">返回</button>
    </div>
  </div>
</template>
 
  <script>
export default {
  data() {
    return {
      list: [],
      paginate: {},
      searchModel: {}
    };
  },
  methods: {
    search(paginate) {
      this.searchModel.paginate = paginate;
      this.post("/product_detail/search", this.searchModel).then(res => {
        this.list = res.models;
        this.paginate = res.paginate;
      });
    }
  },
  mounted() {
    var id = this.$route.query.id;
    this.searchModel.productId = id;
  }
};
</script>