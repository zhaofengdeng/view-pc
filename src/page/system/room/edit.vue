<template>
  <div>
    <v-menu select="room"></v-menu>
    <v-head></v-head>
    <table class="edit_table">
      <tr>
        <td>寝室号</td>
        <td>
          <input type="text" v-model="model.no">
        </td>
        <td>可容纳人数</td>
        <td>
          <input type="number" v-model="model.sumQty">
        </td>
      </tr>
    </table>
    <button type="button" @click="updateButtonClick">更新</button>
    <button type="button" @click="$router.go(-1);" class="default">返回</button>
  </div>
</template>
  <script>
export default {
  data() {
    return {
      checkModel: [
        {
          key: "no",
          name: "寝室号",
          value: "required",
          maxLength: 100
        },
        {
          key: "sumQty",
          name: "可容纳人数",
          value: "required",
          maxLength: 100
        }
      ],
      model: { curQty: 0 }
    };
  },
  methods: {
    updateButtonClick() {
      var flag = this.check(this.model, this.checkModel);
      if (!flag) {
        return;
      }
      this.post("/room/save_or_update", this.model).then(res => {
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