<template>
  <div>
    <v-menu select="order"></v-menu>
    <v-head></v-head>
    <div class="search_form">
      <div class="head">
        <v-search-select
          label="状态"
          optionKey="value"
          optionLabel="name"
          v-model="searchModel.status"
          :objects="selects"
        ></v-search-select>
        <div style="width:100%;height:50px;clear:both;">
          <button @click="search" type="button" style="float:right">查询</button>
        </div>
      </div>
    </div>
    <table class="data_table">
      <thead>
        <tr>
          <th>序号</th>
          <th>订单号</th>
          <th>订单金额</th>
          <th>订单日期</th>
          <th>用户名称</th>
          <th>用户手机</th>
          <th>用户地址</th>
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
          <td>{{model.user.name}}</td>
          <td>{{model.user.phone}}</td>
          <td>{{model.user.address}}</td>
          <td class="status">{{model.statusText}}</td>
          <td class="status">
            <button v-if="model.status==1" @click="confirmButtonClick(model)">已发货</button>
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
      searchModel: { payStatus: 1 },
      paginate: {},
      selects: [
        { name: "全部", value: null },
        { name: "未发货", value: 1 },
        { name: "未收货", value: 2 }
      ]
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
    confirmButtonClick(model) {
      model.status = 2;
      this.post("/order/update", model).then(res => {
        this.search();
      });
    }
  },
  mounted() {}
};
</script>