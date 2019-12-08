<template>
    <div>
        <v-menu select="user"></v-menu>
        <table class="detail_table">
            <tr>
                <td>用户名</td>
                <td>{{model.name}}</td>
                <td>账号</td>
                <td>{{model.account}}</td>
            </tr>
            <tr>
                <td>邮箱</td>
                <td>{{model.email}}</td>
                <td>账号</td>
                <td>{{model.enable}}</td>
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
      this.post("/user/search_by_id", { id: id }).then(res => {
        this.model = res;
      });
    }
  }
};
</script>