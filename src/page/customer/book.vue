<template>
  <div>
    <v-menu select="book"></v-menu>
    <v-head></v-head>
    <div class="search_form">
      <div class="head">
        <v-search-input label="名称" v-model="searchModel.name"></v-search-input>
        <v-search-input label="编码" v-model="searchModel.code"></v-search-input>
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
            <td style="min-width:100px;">编号</td>
            <td style="width:150px;">{{model.code}}</td>
            <td style="min-width:100px;">书名</td>
            <td style="width:150px;">{{model.name}}</td>
            <td style="background-color:#fff;text-align:center;width:120px;" rowspan="2">
              <img :src="model.img" style="width:100px;">
            </td>
          </tr>
          <tr>
            <td>售价</td>
            <td>{{model.sellMoney}}</td>
            <td>出版日期</td>
            <td>{{model.chuBanDate}}</td>
          </tr>
          <tr>
            <td>出版社</td>
            <td colspan="3">{{model.chuBanCompany}}</td>
            <td style="background-color:#fff;">
              <button @click="addBuyCar(model)" class="" type="button" style="float:right">购物车</button>
            </td>
          </tr>
          <tr>
            <td>简介</td>
            <td colspan="4">{{model.brief}}</td>
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
      this.post("/book/search", this.searchModel).then(res => {
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
      this.post("/order/add_book", {
        userId: this.user.id,
        bookId: model.id
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