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
          <button @click="blankButtonClick" type="button" class="default" style="float:right">去购物车</button>
        </div>
      </div>
    </div>
    <div>
      <div v-for="model in list" style="width:800px;float:left;margin-right:30px;margin-top:20px;">
        <table class="detail_table">
          <tr>
            <td style="min-width:100px;">名称</td>
            <td style="width:150px;">{{model.name}}</td>
            <td style="min-width:100px;">价格</td>
            <td style="width:150px;">{{model.money}}</td>
            <td style="background-color:#fff;text-align:center;width:120px;" rowspan="2">
              <img :src="model.img" style="width:100px;">
              <button @click="addBuyCar(model)" class="" type="button" style="float:right">购物车</button>
            </td>
          </tr>
          <tr>
            <td>楼层</td>
            <td>{{model.type1}}</td>
            <td>窗口</td>
            <td>{{model.type2}}</td>
          </tr>
        </table>
      </div>
    </div>
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
      user: null
    };
  },
  methods: {
    search(paginate) {
      this.searchModel.paginate = paginate;
      this.post("/product/search ", this.searchModel).then(res => {
        this.list = res.models;
        this.paginate = res.paginate;
      });
    },
    blankButtonClick() {
      this.$router.push({
        path: "/customer/buy_car"
      });
    },
    addBuyCar(model) {
      this.post("/order/add_product", {
        userId: this.user.id,
        productId: model.id
      }).then(res => {
        this.alert("添加成功");
      });
    }
  },
  mounted() {
    this.user = this.SessionUtil.get("session_user");
  }
};
</script>