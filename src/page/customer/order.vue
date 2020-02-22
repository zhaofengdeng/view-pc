<template>
  <div>
    <v-menu select="order"></v-menu>
    <v-head></v-head>
    <table class="data_table">
      <thead>
        <tr>
          <th>序号</th>
          <th>订单号</th>
          <th>订单金额</th>
          <th>订单日期</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(model,index) in list">
          <td class="no">{{$refs.pagination.toDataNo(index)}}</td>
          <td>{{model.no}}</td>
          <td>{{model.payMoney}}</td>
          <td>{{model.insertedAt}}</td>
          <td class="status">{{model.statusText}}</td>
          <td class="status">
            <button v-if="model.status==0" @click="paymentButtonClick(model)">付款</button>
            <button v-if="model.status==2" @click="confirmButtonClick(model)">确认收货</button>
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
      searchModel: {}
    };
  },
  methods: {
    search(paginate) {
      this.searchModel.paginate = paginate;
      this.post("/order/search", this.searchModel).then(res => {
        this.list = res.models;
        this.paginate = res.paginate;
      });
    },
    paymentButtonClick(model) {
      this.$router.push({
        path: "/customer/buy_car"
      });
    },
    confirmButtonClick(model) {
      model.status = 3;
      this.post("/order/update", model).then(res => {
        this.search();
      });
    }
  },
  mounted() {
    this.searchModel.userId = this.SessionUtil.get("session_user").id;
  }
};
</script>