<template>
  <div>
    <v-menu select="buyCar"></v-menu>
    <v-head></v-head>
    <div class="edit_table_page" style="width:calc(100% - 220px);">
      <table class="edit_table">
        <tr>
          <td>姓名</td>
          <td>{{model.name}}</td>
          <td>手机号</td>
          <td>{{model.phone}}</td>
        </tr>
        <tr>
          <td>余额</td>
          <td>{{model.money}}</td>
          <td>地址</td>
          <td colspan="3">{{model.address}}</td>
        </tr>
        <tr></tr>
      </table>
      <table class="data_table">
        <thead>
          <tr>
            <th>序号</th>
            <th>名称</th>
            <th>编码</th>
            <th>作者</th>
            <th>出版社</th>
            <th>出版日期</th>
            <th>售价</th>
            <th>编辑</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(model,index) in list">
            <td class="no">{{index+1}}</td>
            <td>{{model.book.name}}</td>
            <td>{{model.book.code}}</td>
            <td>{{model.book.author}}</td>
            <td>{{model.book.chuBanCompany}}</td>
            <td>{{model.book.chuBanDate}}</td>
            <td>{{model.book.sellMoney}}</td>
            <td class="button">
              <button @click="deleteButtonClick(model)">删除</button>
            </td>
          </tr>
        </tbody>
        <tr v-if="list.length==0">
          <td colspan="8" style="text-align:center;">暂无任何书籍</td>
        </tr>
      </table>
      <div class="edit_button_group">
        <button type="button" @click="updateButtonClick">支付</button>
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
    load() {
      this.post("/order/search_details", { userId: this.model.id }).then(
        res => {
          this.list = res;
        }
      );
    },
    updateButtonClick() {
      if (this.list.length == 0) {
        this.alert("请购买书籍");
        return;
      }
      this.post("/order/payment", { id: this.list[0].order.id }).then(res => {
        this.SessionUtil.set("session_user", res);
        this.alert("付款成功").then(res => {
          this.$router.push({
            path: "/customer/order"
          });
        });
      });
    },
    deleteButtonClick(model) {
      this.post("/order/delete_book", { id: model.id }).then(res => {
        this.load();
      });
    }
  },
  mounted() {
    this.model = this.SessionUtil.get("session_user");
    this.load();
  }
};
</script>