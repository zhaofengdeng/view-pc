<template>
  <div>
    <v-menu select="book"></v-menu>
    <v-head></v-head>
    <div class="edit_table_page">
      <table class="edit_table">
        <tr>
          <td>名称</td>
          <td>
            <input type="text" v-model="model.name">
          </td>
          <td>编码</td>
          <td>
            <input type="text" v-model="model.code">
          </td>
        </tr>
        <tr>
          <td>简介</td>
          <td>
            <input type="text" v-model="model.brief">
          </td>
          <td>封面</td>
          <td>
            <input type="file" id="file" @change="fileChange" accept="image/*">
          </td>
        </tr>
        <tr>
          <td>作者</td>
          <td>
            <input type="text" v-model="model.author">
          </td>
          <td>出版社</td>
          <td>
            <input type="text" v-model="model.chuBanCompany">
          </td>
        </tr>
        <tr>
          <td>出版日期</td>
          <td>
            <input type="date" v-model="model.chuBanDate">
          </td>
          <td>供应商</td>
          <td>
            <input type="text" v-model="model.sellCompany">
          </td>
        </tr>
        <tr>
          <td>供应商电话</td>
          <td>
            <input type="text" v-model="model.sellPhone">
          </td>
          <td>供应商地址</td>
          <td>
            <input type="text" v-model="model.sellAddress">
          </td>
        </tr>
        <tr>
          <td>进价</td>
          <td>
            <input type="number" v-model="model.buyMoney">
          </td>
          <td>售价</td>
          <td>
            <input type="number" v-model="model.sellMoney">
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
      model: {},
      img: null,
      checkModel: [
        {
          key: "name",
          name: "姓名",
          value: "required",
          maxLength: 100
        },
        {
          key: "code",
          name: "编号",
          value: "required",
          maxLength: 100
        },
        {
          key: "buyMoney",
          name: "进价",
          value: "required",
          maxLength: 10
        },
        {
          key: "sellMoney",
          name: "售价",
          value: "required",
          maxLength: 10
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
      this.post("/book/save_or_update", this.model).then(res => {
        this.$router.push({
          path: "/system/book/list"
        });
      });
    },
    blobToDataURL(blob, cb) {
      let reader = new FileReader();
      reader.onload = function(evt) {
        var base64 = evt.target.result;
        cb(base64);
      };
      reader.readAsDataURL(blob);
    },
    fileChange() {
      console.log("========");
      var file = document.getElementById("file");

      var img = file.files[0];
      const that = this;
      if (img) {
        var url = URL.createObjectURL(img);
        this.blobToDataURL(img, function(base64Url) {
          that.model.img = base64Url;
        });
        console.log(this.model.img);
      }
    }
  },
  mounted() {
    var id = this.$route.query.id;
    if (!this.StringUtil.isNull(id)) {
      this.post("/book/search_by_id", { id: id }).then(res => {
        this.model = res;
      });
    }
  }
};
</script>