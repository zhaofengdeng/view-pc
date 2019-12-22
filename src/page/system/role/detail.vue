<template>
  <div>
    <v-menu select="role"></v-menu>
    <v-head></v-head>
    <table class="detail_table">
      <tr>
        <td>名称</td>
        <td>{{model.name}}</td>
        <td>英文名称</td>
        <td>{{model.engName}}</td>
      </tr>
      <tr>
        <td>权限</td>
        <td colspan="3">{{model.permissions | listFormat('name') }}</td>
      </tr>
      <tr>
        <td>创建时间</td>
        <td>{{model.insertedAt}}</td>
        <td>更新时间</td>
        <td>{{model.updatedAt}}</td>
      </tr>
    </table>
    <button type="button" @click="$router.go(-1);" class="default">返回</button>
  </div>
</template>
  <script>
export default {
  data() {
    return {
      model: {}
    };
  },
  methods: {},
  mounted() {
    var id = this.$route.query.id;
    if (!this.StringUtil.isNull(id)) {
      this.post("/role/search_by_id", { id: id }).then(res => {
        this.model = res;
      });
    }
  }
};
</script>