<template>
  <div style="width:100%;height:50px;float:left;" class="clearfix">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="value.curPage"
      :page-sizes="[15,100, 200, 300, 400]"
      :page-size="value.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="value.total"
    ></el-pagination>
  </div>
</template>

<script>
import Pagination from "element-ui";
import Vue from "vue";
Vue.use(Pagination);
export default {
  props: ["value"],
  components: {},
  created() {
    if (this.value == undefined) {
      this.value = {};
    }

    if (this.value.curPage == undefined) {
      this.value.curPage = 1;
    }
    if (this.value.pageSize == undefined) {
      this.value.pageSize = 15;
    }
    if (this.value.total == undefined) {
      this.value.total = 0;
    }
  },
  mounted() {},
  methods: {
    toDataNo(index) {
      return (this.value.curPage - 1) * this.value.pageSize + index + 1;
    },
    handleSizeChange(val) {
      this.value.pageSize = val;
      this.parentSearch();
    },
    handleCurrentChange(val) {
      this.value.curPage = val;
      this.parentSearch();
    },
    parentSearch() {
      this.$emit("input", {
        curPage: this.value.curPage,
        total: this.value.total,
        pageSize: this.value.pageSize
      });
      this.$emit("search", {
        paginationCurPage: this.value.curPage,
        paginationPageSize: this.value.pageSize
      });
    }
  },
  data() {
    return {};
  }
};
</script>