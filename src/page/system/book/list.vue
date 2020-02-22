<template>
  <div>
    <v-menu select="book"></v-menu>
    <v-head></v-head>
    <div class="search_form">
      <div class="head">
        <v-search-input label="名称" v-model="searchModel.name"></v-search-input>
        <v-search-input label="编码" v-model="searchModel.code"></v-search-input>
        <div style="width:100%;height:50px;clear:both;">
          <button @click="search" type="button" style="float:right">查询</button>
          <button @click="blankButtonClick" type="button" class="default" style="float:right">新增</button>
        </div>
      </div>
    </div>
    <table class="data_table">
      <thead>
        <tr>
          <th>序号</th>
          <th>名称</th>
          <th>编码</th>
          <th>作者</th>
          <th>出版社</th>
          <th>出版日期</th>
          <th>进价</th>
          <th>售价</th>
          <th>库存量</th>
          <th>供应商</th>
          <th>供应商电话</th>
          <th>供应商地址</th>
          <th>进货明细</th>
          <th>编辑</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(model,index) in list">
          <td class="no">{{$refs.pagination.toDataNo(index)}}</td>
          <td>{{model.name}}</td>
          <td>{{model.code}}</td>
          <td>{{model.author}}</td>
          <td>{{model.chuBanCompany}}</td>
          <td>{{model.chuBanDate}}</td>
          <td>{{model.buyMoney}}</td>
          <td>{{model.sellMoney}}</td>
          <td>{{model.allQty-model.sellQty}}</td>
          <td>{{model.sellCompany}}</td>
          <td>{{model.sellAddress}}</td>
          <td>{{model.sellPhone}}</td>
          <td>
            <button @click="addBookButtonClick(model)">入库</button>
            <button @click="viewButtonClick(model)">查看</button>
          </td>
          <td>
            <button @click="editButtonClick(model)">修改</button>
          </td>
        </tr>
      </tbody>
    </table>
    <v-pagination ref="pagination" v-model="paginate" @search="search"></v-pagination>
    <el-dialog title="增加库存" :visible.sync="addBookDialogFlag" width="30%">
      <table class="edit_table">
        <tr>
          <td>数量</td>
          <td>
            <input type="number" v-model="addBookQty">
          </td>
        </tr>
      </table>
      <span slot="footer" class="dialog-footer">
        <button class="default" @click="addBookDialogFlag = false">取消</button>
        <button @click="addBook">确定</button>
      </span>
    </el-dialog>
  </div>
</template>
  <script>
export default {
  data() {
    return {
      list: [],
      searchModel: {},
      paginate: {},
      addBookId: null,
      addBookQty: null,
      addBookDialogFlag: false
    };
  },
  methods: {
    search(paginate) {
      this.searchModel.paginate = paginate;
      this.post("/book/search", this.searchModel).then(res => {
        this.list = res.models;
        this.paginate = res.paginate;
      });
    },
    blankButtonClick() {
      this.$router.push({
        path: "/system/book/edit"
      });
    },
    editButtonClick(model) {
      this.$router.push({
        path: "/system/book/edit",
        query: { id: model.id }
      });
    },
    addBookButtonClick(model) {
      this.addBookId = model.id;
      this.addBookDialogFlag = true;
    },
    viewButtonClick(model) {
      this.$router.push({
        path: "/system/book/view",
        query: { id: model.id }
      });
    },
    addBook() {
      if (this.StringUtil.isNull(this.addBookQty)) {
        this.showErrorMsg("请填写数量");
        return;
      }
      this.post("/book/add_goods", {
        id: this.addBookId,
        qty: this.addBookQty
      }).then(res => {
        this.search();
        this.addBookDialogFlag = false;
      });
    }
  },
  mounted() {}
};
</script>