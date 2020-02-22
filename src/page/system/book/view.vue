<template>
  <div>
    <v-menu select="customer"></v-menu>
    <v-head></v-head>
    <div class="detail_table_page">
      <table class="data_table">
        <thead>
          <tr>
            <th>序号</th>
            <th>名称</th>
            <th>编号</th>
            <th>进货日期</th>
            <th>进货数量</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(model,index) in list">
            <td class="no">{{index+1}}</td>
            <td>{{model.book.name}}</td>
            <td>{{model.book.code}}</td>
            <td>{{model.insertedAt}}</td>
            <td>{{model.qty}}</td>
          </tr>
        </tbody>
      </table>
      <div class="detail_button_group">
        <button type="button" @click="$router.go(-1);" class="default">返回</button>
      </div>
    </div>
  </div>
</template>
  <script>
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {},
  mounted() {
    this.post("/book/search_goods_by_id", { id: this.$route.query.id }).then(
      res => {
        this.list = res;
      }
    );
  }
};
</script>