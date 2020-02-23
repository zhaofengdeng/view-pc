<template>
  <div>
    <v-menu select="order"></v-menu>
    <v-head></v-head>
    <div class="detail_table_page" style="width:calc( 100% - 250px )">
      <table class="detail_table">
        <tr>
          <td>订单号</td>
          <td>{{model.no}}</td>
          <td>是否打包</td>
          <td>{{model.flag}}</td>
        </tr>
        <tr>
          <td>用户名</td>
          <td>{{model.user.name}}</td>
          <td>手机号</td>
          <td>{{model.user.phone}}</td>
        </tr>
        <tr>
          <td>金额</td>
          <td>{{model.payMoney}}</td>
          <td>状态</td>
          <td>{{model.statusText}}</td>
        </tr>
      </table>
      <table class="data_table">
        <thead>
          <tr>
            <th>序号</th>
            <th>名称</th>
            <th>售价</th>
            <th>楼层</th>
            <th>窗口</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(detail,index) in list">
            <td class="no">{{index+1}}</td>
            <td>{{detail.product.name}}</td>
            <td>{{detail.money}}</td>
            <td>{{detail.product.type1}}</td>
            <td>{{detail.product.type2}}</td>
          </tr>
        </tbody>
      </table>
      <div class="detail_button_group">
        <button v-if="model.status==1" @click="confirmButtonClick(model)">制作完成</button>
        <button type="button" @click="$router.go(-1);" class="default">返回</button>
      </div>
    </div>
  </div>
</template>
 
  <script>
export default {
  data() {
    return {
      model: {},
      list: []
    };
  },
  methods: {
    confirmButtonClick(model) {
      model.status = 2;
      this.post("/order/update", model).then(res => {
        this.$router.push({
          path: "/shop/order/list"
        });
      });
    }
  },
  mounted() {
    var id = this.$route.query.id;
    if (!this.StringUtil.isNull(id)) {
      this.post("/order/search_details_by_id", { id: id }).then(res => {
        this.list = res;
        this.model = res[0].order;
      });
    }
  }
};
</script>