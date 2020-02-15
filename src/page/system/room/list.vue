<template>
  <div>
    <v-menu select="room"></v-menu>
    <v-head></v-head>
    <div class="search_form">
      <div class="head">
        <v-search-input label="寝室号" v-model="searchModel.no"></v-search-input>
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
          <th>寝室号</th>
          <th>可容纳人数</th>
          <th>现有人数</th>
          <th>上次分数</th>
          <th>编辑</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(model,index) in list">
          <td class="no">{{$refs.pagination.toDataNo(index)}}</td>
          <td>{{model.no}}</td>
          <td>{{model.sumQty}}</td>
          <td>{{model.curQty}}</td>
          <td>{{model.score}}</td>
          <td class="button">
            <button @click="scoreButtonClick(model)">评分</button>
          </td>
        </tr>
      </tbody>
    </table>
    <v-pagination ref="pagination" v-model="paginate" @search="search"></v-pagination>
  </div>
</template>
  <script>
export default {
  data() {
    return {
      list: [],
      searchModel: {},
      paginate: {}
    };
  },
  methods: {
    search(paginate) {
      this.searchModel.paginate = paginate;
      this.post("/room/search", this.searchModel).then(res => {
        this.list = res.models;
        this.paginate = res.paginate;
      });
    },
    blankButtonClick() {
      this.$router.push({
        path: "/system/room/edit"
      });
    },
    editButtonClick(model) {
      this.$router.push({
        path: "/system/room/edit",
        query: { id: model.id }
      });
    },
    scoreButtonClick(model) {
      this.$router.push({
        path: "/system/room/score",
        query: { id: model.id }
      });
    },

    detailButtonClick(model) {
      this.$router.push({
        path: "/system/room/detail",
        query: { id: model.id }
      });
    }
  },
  mounted() {}
};
</script>