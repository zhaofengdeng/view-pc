<template>
  <div>
    <v-menu select="analysis"></v-menu>
    <v-head></v-head>
    <div class="search_form">
      <div class="head">
        <div class="clearfix group">
          <div class="label">开始日期</div>
          <div class="value">
            <input type="date" v-model="searchModel.beginDate">
          </div>
        </div>
        <div class="clearfix group">
          <div class="label">截止日期</div>
          <div class="value">
            <input type="date" v-model="searchModel.endDate">
          </div>
        </div>
        <div style="width:100%;height:50px;clear:both;">
          <button @click="search" type="button" style="float:right">查询</button>
        </div>
      </div>
    </div>
    <table class="data_table">
      <thead>
        <tr>
          <th>序号</th>
          <th>书籍编号</th>
          <th>书籍名</th>
          <th>进价</th>
          <th>售价</th>
          <th>销售数量</th>
          <th>销售额</th>
          <th>利润</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(model,index) in list">
          <td class="no">{{index+1}}</td>
          <td>{{model.code}}</td>
          <td>{{model.name}}</td>
          <td>{{model.buy_money}}</td>
          <td>{{model.sell_money}}</td>
          <td>{{model.sell_qty}}</td>
          <td>{{model.sell_money}}</td>
          <td>{{model.money}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  <script>
export default {
  data() {
    return {
      list: [],
      searchModel: {}
    };
  },
  methods: {
    search() {
      this.list = [];
      this.post("/order/analysis", this.searchModel).then(res => {
        this.list = res;
      });
    }
  },
  mounted() {
    this.search();
  }
};
</script>