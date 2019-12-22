<template>
  <div>
    <v-menu select="role"></v-menu>
    <v-head></v-head>
    <table class="edit_table">
      <tr>
        <td>名称</td>
        <td>
          <input type="text" v-model="model.name">
        </td>
        <td>英文</td>
        <td>
          <input type="text" v-model="model.engName">
        </td>
      </tr>
      <tr>
        <td>选择权限</td>
        <td colspan="3">
          <el-tree
            ref="tree"
            :data="permissionNodes"
            node-key="id"
            :props="defaultProps"
            show-checkbox
          ></el-tree>
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
      model: {
        enable: true
      },
      permissionNodes: [],
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
          key: "engName",
          name: "英文名称",
          value: "required"
        }
      ]
    };
  },
  methods: {
    updateButtonClick() {
      var permissions = this.$refs.tree.getCheckedNodes().filter(function(e) {
        return Object.keys(e).some(function(key) {
          if (e.isTreeNode) {
            return false;
          }
          return true;
        });
      });
      this.model.permissions = permissions;
      var flag = this.check(this.model, this.checkModel);
      if (!flag) {
        return;
      }
      this.post("/role/save_or_update", this.model).then(res => {
        this.$router.push({
          path: "/system/role/list"
        });
      });
    },
    updateSelectNode() {
      if (this.model != null && this.model.permissions != null) {
        var permissionIds = [];
        for (var i = 0; i < this.model.permissions.length; i++) {
          permissionIds.push(this.model.permissions[i].id);
        }
        this.$refs.tree.setCheckedKeys(permissionIds);
      }
    }
  },
  mounted() {
    var id = this.$route.query.id;
    if (!this.StringUtil.isNull(id)) {
      this.post("/role/search_by_id", { id: id }).then(res => {
        this.model = res;
        this.updateSelectNode();
      });
    }
    //加载树形结构
    this.post("/tree_node/search_all", {}).then(res => {
      var treeNodes = this.getTreeNodes(res);
      this.post("/permission/search_all", {}).then(res => {
        this.permissionNodes = this.treeNodeInitPermissions(treeNodes, res);
        this.updateSelectNode();
      });
    });
  }
};
</script>