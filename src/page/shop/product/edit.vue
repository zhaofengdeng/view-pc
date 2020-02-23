<template>
  <div>
    <v-menu select="product"></v-menu>
    <v-head></v-head>
    <div class="edit_table_page">
      <table class="edit_table">
        <tr>
          <td>名称</td>
          <td>
            <input type="text" v-model="model.name">
          </td>
          <td>封面</td>
          <td>
            <input type="file" id="file" @change="fileChange" accept="image/*">
          </td>
        </tr>
        <tr>
          <td>楼层</td>
          <td>
            <input type="text" v-model="model.type1">
          </td>
          <td>窗口</td>
          <td>
            <input type="text" v-model="model.type2">
          </td>
        </tr>
        <tr>
          <td>数量</td>
          <td>
            <input type="number" v-model="model.allQty">
          </td>
          <td>已卖数量</td>
          <td>
            <input type="number" v-model="model.sellQty">
          </td>
        </tr>
        <tr>
          <td>价格</td>
          <td>
            <input type="number" v-model="model.money">
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
          name: "名称",
          value: "required",
          maxLength: 100
        },
        {
          key: "type1",
          name: "楼层",
          value: "required",
          maxLength: 100
        },
        {
          key: "type2",
          name: "窗口",
          value: "required",
          maxLength: 10
        },
        {
          key: "money",
          name: "价格",
          value: "required",
          maxLength: 10
        },
        {
          key: "allQty",
          name: "数量",
          value: "required",
          maxLength: 10
        },
        {
          key: "sellQty",
          name: "已卖数量",
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
      this.post("/product/save_or_update", this.model).then(res => {
        this.$router.push({
          path: "/shop/product/list"
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
      this.post("/product/search_by_id", { id: id }).then(res => {
        this.model = res;
      });
    }
  }
};
</script>