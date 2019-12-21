<template>
  <div>
    <v-menu select="permission"></v-menu>
    <table class="detail_table">
      <tr>
        <td>名称</td>
        <td>{{model.name}}</td>
        <td>url</td>
        <td>{{model.url}}</td>
      </tr>
      <tr>
        <td>所属树节点</td>
        <td>
          <template v-if="model.node!=null">{{model.node.name}}</template>
        </td>
        <td>排序值</td>
        <td>{{model.sort}}</td>
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
      this.post("/permission/search_by_id", { id: id }).then(res => {
        this.model = res;
      });
    }
  }
};
</script>