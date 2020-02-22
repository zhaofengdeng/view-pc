<template>
  <div>
    <v-menu select="notice"></v-menu>
    <v-head></v-head>
        <div class="edit_table_page">
    <table class="edit_table">
      <tr>
        <td>标题</td>
        <td>
          <input type="text" v-model="model.title">
        </td>
      </tr>
      <tr>
        <td>内容</td>
        <td>
          <textarea v-model="model.msg" style="width:800px;height:100px;"></textarea>
        </td>
      </tr>
    </table>

     <div class="edit_button_group">
      <button type="button" @click="updateButtonClick">更新</button>
    <button type="button" @click="$router.go(-1);" class="default">返回</button>
      </div>
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
          key: "title",
          name: "标题",
          value: "required",
          maxLength: 100
        },
        {
          key: "msg",
          name: "内容",
          value: "required",
          maxLength: 200
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
      this.post("/notice/save_or_update", this.model).then(res => {
        this.$router.push({
          path: "/system/notice/list"
        });
      });
    }
  },
  mounted() {
    var id = this.$route.query.id;
    if (!this.StringUtil.isNull(id)) {
      this.post("/notice/search_by_id", { id: id }).then(res => {
        this.model = res;
      });
    }
  }
};
</script>