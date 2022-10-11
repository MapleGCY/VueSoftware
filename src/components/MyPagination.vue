<template>
  <div class="MyPagination">
    <el-pagination
      layout="total,prev,pager,next,jumper"
      :page-size="pageSize"
      :total="total"
      :current-page="currentPage"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 100
    },
    pageSize: {
      type: Number,
      default: 8
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  methods: {
    changePage(page) {
      // console.log('dsadas', this.currentPage)
      //console.log('分页的page', this.currentPage)
      this.$emit('changePage', page)
    },
    change() {
      return this.currentPage
    }
  }
}
</script>

<style lang="less" scoped>
.MyPagination {
  text-align: center;
  margin: 20px;
}
</style>