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
            <th v-if="model.status==3">评价</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(detail,index) in list">
            <td class="no">{{index+1}}</td>
            <td>{{detail.product.name}}</td>
            <td>{{detail.money}}</td>
            <td>{{detail.product.type1}}</td>
            <td>{{detail.product.type2}}</td>
            <td v-if="model.status==3">
              <button @click="commentButtonClick(detail)">评价</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="detail_button_group">
        <button v-if="model.status==2" @click="confirmButtonClick(model)">确认取餐</button>
        <button type="button" @click="$router.go(-1);" class="default">返回</button>
      </div>
    </div>
    <el-dialog title="评价" :visible.sync="dialogFlag" width="30%">
      <table class="edit_table">
        <tr>
          <td>分数</td>
          <td>
            <el-rate v-model="comment.score" :colors="colors"></el-rate>
          </td>
        </tr>
        <tr>
          <td style="width:20%;">评论</td>
          <td>
            <input type="text" v-model="comment.comment">
          </td>
        </tr>
      </table>
      <span slot="footer" class="dialog-footer">
        <button class="default" @click="dialogFlag = false">取消</button>
        <button @click="commentConfirm">确定</button>
      </span>
    </el-dialog>
  </div>
</template>
 
  <script>
export default {
  data() {
    return {
      model: {},
      list: [],
      comment: {},
      dialogFlag: false,
      product: {},
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"]
    };
  },
  methods: {
    confirmButtonClick(model) {
      model.status = 3;
      this.post("/order/update", model).then(res => {
        this.$router.push({
          path: "/customer/order"
        });
      });
    },
    commentButtonClick(model) {
      this.product = model.product;
      this.comment = {};
      this.dialogFlag = true;
    },
    commentConfirm() {
      console.log(this.comment);
      if (
        this.StringUtil.isNull(this.comment.score) ||
        this.comment.score == 0
      ) {
        this.showErrorMsg("请打分");
        return;
      }
      this.post("/product_detail/save_or_update", {
        productId: this.product.id,
        userId: this.SessionUtil.get("session_user").id,
        comment: this.comment.comment,
        score: this.comment.score
      }).then(res => {
        this.dialogFlag = false;
        this.alert("评论成功");
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