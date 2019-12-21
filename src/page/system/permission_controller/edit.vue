<template>
  <div>
    <v-menu select="user"></v-menu>
    <table class="edit_table">
      <tr>
        <td>名称</td>
        <td>
          <input type="text" v-model="model.name">
        </td>
        <td>url</td>
        <td>
          <input type="text" v-model="model.url">
        </td>
      </tr>
      <tr>
        <td>排序值</td>
        <td>
          <input type="text" v-model="model.sort">
        </td>
        <td>所属树节点</td>
        <td>
          <template v-if="model.node!=null">{{model.node.name}}</template>
        </td>
      </tr>
      <tr>
        <td>选择所属树节点</td>
        <td colspan="3">
          <el-tree
            :data="treeNodes"
            node-key="id"
            :props="defaultProps"
            @node-click="handleNodeClick"
          ></el-tree>
        </td>
      </tr>
    </table>
    <div></div>
    <button type="button" @click="updateButtonClick">更新</button>
    <button type="button" @click="$router.go(-1);" class="default">返回</button>
  </div>
</template>
  <script>
export default {
  data() {
    return {
      model: {
        enable: true
      },
      treeNodes: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      checkModel: [
        {
          key: "name",
          name: "姓名",
          value: "required"
        },
        {
          key: "url",
          name: "url",
          value: "required"
        },
        {
          key: "sort",
          name: "sort",
          value: "required"
        },
        {
          key: "node",
          name: "所属数节点",
          value: "required"
        }
      ]
    };
  },
  methods: {
    updateButtonClick() {
      var flag = this.check(this.model, this.checkModel);
      if (!flag) {
        return;
      }
      this.post("/permission_controller/save_or_update", this.model).then(
        res => {
          this.$router.push({
            path: "/system/permission_controller/list"
          });
        }
      );
    },
    handleNodeClick(data) {
      this.model.node = data;
      this.$forceUpdate();
    }
  },
  mounted() {
    var id = this.$route.query.id;
    if (!this.StringUtil.isNull(id)) {
      this.post("/permission_controller/search_by_id", { id: id }).then(res => {
        this.model = res;
      });
    }
    this.post("/tree_node/search_all", {}).then(res => {
      this.treeNodes = this.getTreeNodes(res);
    });
  }
};
</script>