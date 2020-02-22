<template>
  <div>
    <v-menu select="room"></v-menu>
    <v-head></v-head>
    <div class="edit_table_page">
      <table class="detail_table">
        <tr>
          <td>寝室号</td>
          <td>{{model.no}}</td>
          <td>可容纳人数</td>
          <td>{{model.sumQty}}</td>
        </tr>
      </table>
      <table class="edit_table" style="margin-top:20px;">
        <tr>
          <td>分数</td>
          <td>
            <input type="number" v-model="model.score">
          </td>
        </tr>
      </table>
      <div class="edit_button_group">
        <button type="button" @click="updateButtonClick">更新</button>
        <button type="button" @click="$router.go(-1);" class="default">返回</button>
      </div>
    </div>
  </div>
</template>
  <script>
export default {
  data() {
    return {
      checkModel: [
        {
          key: "score",
          name: "分数",
          value: "required",
          maxLength: 100
        }
      ],
      model: {}
    };
  },
  methods: {
    updateButtonClick() {
      var flag = this.check(this.model, this.checkModel);
      if (!flag) {
        return;
      }
      this.post("/room/score", this.model).then(res => {
        this.$router.push({
          path: "/system/room/list"
        });
      });
    }
  },
  mounted() {
    var id = this.$route.query.id;
    if (!this.StringUtil.isNull(id)) {
      this.post("/room/search_by_id", { id: id }).then(res => {
        this.model = res;
      });
    }
  }
};
</script>