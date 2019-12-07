<template>
  <div style="width:100%;height:50px;float:left;" class="clearfix">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="value.curPage"
      :page-sizes="[15,100, 200, 300, 400]"
      :page-size="value.maxPerPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="value.dataCount"
    ></el-pagination>
  </div>
</template>

<script>
import Pagination from "element-ui";
import Vue from "vue";
Vue.use(Pagination);
export default {
  props: ["value", "load"],
  components: {},
  created() {
    if (this.value == undefined) {
      this.value = {};
    }

    if (this.value.curPage == undefined) {
      this.value.curPage = 1;
    }
    if (this.value.maxPerPage == undefined) {
      this.value.maxPerPage = 15;
    }
    if (this.value.dataCount == undefined) {
      this.value.dataCount = 0;
    }
    if (this.load != "lazy") {
      this.parentSearch();
    }
  },
  mounted() {},
  methods: {
    toDataNo(index) {
      return (this.value.curPage - 1) * this.value.maxPerPage + index + 1;
    },
    handleSizeChange(val) {
      this.value.maxPerPage = val;
      this.parentSearch();
    },
    handleCurrentChange(val) {
      this.value.curPage = val;
      this.parentSearch();
    },
    parentSearch() {
      this.$emit("input", {
        curPage: this.value.curPage,
        dataCount: this.value.dataCount,
        maxPerPage: this.value.maxPerPage
      });
      this.$emit("search", {
        curPage: this.value.curPage,
        maxPerPage: this.value.maxPerPage
      });
    }
  },
  data() {
    return {};
  }
};
</script>