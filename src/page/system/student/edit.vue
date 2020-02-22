<template>
  <div>
    <v-menu select="student"></v-menu>
    <v-head></v-head>
    <div class="edit_table_page">
      <table class="edit_table">
        <tr>
          <td>学号</td>
          <td>
            <input type="text" v-model="model.no">
          </td>
          <td>姓名</td>
          <td>
            <input type="text" v-model="model.name">
          </td>
        </tr>
        <tr>
          <td>班级</td>
          <td>
            <input type="text" v-model="model.clazz">
          </td>
          <td>性别</td>
          <td>
            <el-radio-group v-model="model.sex">
              <el-radio label="男">男</el-radio>
              <el-radio label="女">女</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td>手机号</td>
          <td>
            <input type="text" v-model="model.phone">
          </td>
          <td>寝室号</td>
          <td>
            <input type="text" v-model="model.roomNo">
          </td>
        </tr>
        <tr>
          <td>地址</td>
          <td>
            <input type="text" v-model="model.address">
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
          key: "no",
          name: "学号",
          value: "required",
          maxLength: 100
        },
        {
          key: "name",
          name: "姓名",
          value: "required",
          maxLength: 100
        },
        {
          key: "clazz",
          name: "班级",
          value: "required",
          maxLength: 100
        },
        {
          key: "sex",
          name: "性别",
          value: "required",
          maxLength: 100
        },
        {
          key: "phone",
          name: "手机号",
          value: "required",
          maxLength: 100
        },
        {
          key: "roomNo",
          name: "寝室号",
          value: "required",
          maxLength: 100
        },

        {
          key: "address",
          name: "地址",
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
      this.post("/student/save_or_update", this.model).then(res => {
        this.$router.push({
          path: "/system/student/list"
        });
      });
    }
  },
  mounted() {
    var id = this.$route.query.id;
    if (!this.StringUtil.isNull(id)) {
      this.post("/student/search_by_id", { id: id }).then(res => {
        this.model = res;
        this.model.roomNo = res.room.no;
      });
    }
  }
};
</script>