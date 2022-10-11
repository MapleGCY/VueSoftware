<template>
  <div class="params">
    <!-- 1. 目录 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/layout/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/layout/params'}">规格与参数</el-breadcrumb-item>
      <el-breadcrumb-item>规格与包装</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 2. 搜索框 -->
    <div class="search">
      <el-input v-model="input" placeholder="请输入内容" class="input" @change="searchInput"></el-input>
      <el-button type="primary" icon="el-icon-search" class="searchButton" @click="searchInput(input)">搜索</el-button>
      <el-button type="primary" class="searchButton">添加</el-button>
    </div>

    <!-- 3. 表格 -->
    <div class="table">
      <template>
        <el-table :data="tableData" strip style="width: 100%;" border>
          <el-table-column prop="id" label="规格参数ID" width="180px"></el-table-column>
          <el-table-column prop="itemCatId" label="类目ID" width="150px"></el-table-column>
          <el-table-column prop="categoryName" label="规格名称" width="180px"></el-table-column>
          <el-table-column prop="paramData" label="规格参数" class="paramsData" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="200px">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- 4. 分页 -->
    <MyPagination :total="total" :pageSize="pageSize" :currentPage="currentPage" @changePage="changePage" ref="change"></MyPagination>
  </div>
</template>

<script>
import MyPagination from '@/components/MyPagination.vue'
export default {
  components: {
    MyPagination
  },
  data() {
    return {
      input: '',
      tableData: [],
      list: [],
      total: 10,
      pageSize: 1,
      currentPage: 1,
      type: 1
    }
  },
  created() {
    this.http(1)
  },
  methods: {
    /* 
       搜索查询
    */
    searchInput(input) {
      if (!input) {
        //console.log('5555', this.currentPage)
        //console.log('跳转到首页')
        this.type = 1
        this.currentPage = 1
        // console.log('数据', this.$refs.change.change())
        this.http(1)
        return
      }
      // console.log('5555', input)
      this.$api.paramsSearch({ search: input }).then(res => {
        this.currentPage = 1
        if (res.data.status === 200) {
          //  console.log('搜索结果', res.data)

          this.list = res.data.result
          /* this.$nextTick(() => {
            console.log('5555', this.$refs.change.change())
          }) */
          this.pageSize = 3
          this.total = res.data.result.length
          this.tableData = res.data.result.slice(0, 3)
          //  console.log('高亮页面数据', this.tableData)
          this.type = 2
        } else {
          this.tableData = []
          this.total = 1
          this.pageSize = 1
          this.type = 1
        }
      })
    },
    /* 
      页面改变
    */
    changePage(Page) {
      this.currentPage = Page
      if (this.type === 1) {
        this.http(Page)
      } else {
        // console.log('现在页面', Page)
        this.tableData = this.list.slice((Page - 1) * 3, Page * 3)
        // console.log('高亮页面数据', this.tableData)
        // console.log('99999', this.tableData)
      }
    },
    /* 
      该页的数据
    */
    http(page) {
      this.$api.getParams({ page }).then(res => {
        // console.log(res.data)
        if (res.data.status === 200) {
          this.tableData = res.data.data
          this.total = res.data.total
          this.pageSize = res.data.pageSize
          // console.log(this.pageSize, this.tableData)
        } else {
          console.log('数据获取失败')
        }
      })
    },
    /* 
      编辑该行数据
    */
    handleEdit(index, row) {},
    /* 
      删除该行数据
    */
    handleDelete(index, row) {
      console.log('5555', this.tableData[value])
    }
  }
}
</script>

<style lang="less" scoped>
.params {
  margin: 10px;
  .search {
    margin: 20px 0;
    display: flex;
    .searchButton {
      margin-left: 20px;
    }
  }
  .table {
    display: flex;
  }
}
</style>