<template>
  <div class="goods">
    <!-- 搜索区域 -->
    <div class="header">
      <!-- change	仅在输入框失去焦点或用户按下回车时触发 -->
      <el-input v-model="input" placeholder="请输入内容" @change="searchInput"></el-input>
      <el-button type="primary" @click="searchInput(input)">查询</el-button>
      <el-button type="primary" @click="addGoods">弹框添加</el-button>
    </div>

    <!-- 表格区域 -->
    <div class="wrapper">
      <el-table :data="tableData" border>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="商品ID" width="100"></el-table-column>
        <el-table-column prop="title" label="商品名称" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="price" label="商品价格" width="100"></el-table-column>
        <el-table-column prop="num" label="商品数量" width="100"></el-table-column>
        <el-table-column prop="category" label="规格类目" width="100"></el-table-column>
        <el-table-column prop="image" label="商品图片" show-overflow-tooltip></el-table-column>
        <el-table-column prop="sellPoint" label="商品卖点" show-overflow-tooltip></el-table-column>
        <el-table-column prop="descs" label="商品描述" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <MyPaginationVue :total="total" :pageSize="pageSize" @changePage="changePage" :currentPage="currentPage" ref="change"></MyPaginationVue>

    <!-- 弹框添加商品 -->
    <GoodsDialog :dialogVisible="dialogVisible" @changeDialog="changeDialog" :rowData="rowData" :title="title" ref="changeGoods"></GoodsDialog>

    <!-- 弹框修改商品 -->
    <!-- <changeGoods :dialogVisibleGoods="dialogVisibleGoods"></changeGoods> -->
  </div>
</template>

<script>
import MyPaginationVue from '@/components/MyPagination.vue'
import GoodsDialog from './GoodsDialog.vue'
export default {
  components: {
    MyPaginationVue,
    GoodsDialog
  },
  data() {
    return {
      input: '',
      tableData: [],
      total: 10,
      pageSize: 1,
      type: 1,
      list: [],
      dialogVisible: false,
      dialogVisibleGoods: false,
      currentPage: 1,
      title: '添加商品',
      rowData: []
    }
  },
  methods: {
    /* 
     1.点击编辑按钮 显示弹框 2.弹框上回回显数据展示 -当前行数据
    */
    handleEdit(index, row) {
      // console.log('所有商品', this.tableData)
      this.title = '编辑商品'
      this.dialogVisible = true
      this.rowData = { ...row } //保证数据每次都是新地址，但内容不变
      // console.log('6564', this.rowData)
      // this.$refs.changeGoods.goodsForm = row //改变弹框中的内容方法 1：ref   2:子组件监听器
      // console.log('442524', this.$refs.changeGoods.goodsForm)
    },
    /* 
      删除商品
    */
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$api
            .deleteGoods({
              id: row.id
            })
            .then(res => {
              console.log(res.data)
              if (res.data.status === 200) {
                this.http(1)
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
              } else {
                console.log('删除失败')
              }
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    /* 
       弹出添加商品框
    */
    addGoods() {
      this.title = '添加商品'
      this.dialogVisible = true
      // console.log(this.dialogVisible)
    },
    changeDialog() {
      this.dialogVisible = !this.dialogVisible
    },
    /* 
       搜索查询数据--------
    */

    searchInput(value) {
      if (!value) {
        this.currentPage = 1
        this.type = 1
        this.http(1)
        return
      }
      this.$api
        .getSearch({
          search: value
        })
        .then(res => {
          this.currentPage = 1
          //console.log('搜索', res.data)
          if (res.data.status === 200) {
            this.list = res.data.result
            //假设需要分页---我们处理分页--
            this.total = res.data.result.length
            // console.log(this.total)
            this.pageSize = 3
            this.tableData = res.data.result.slice(0, 3)
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
     搜索
    */
    changePage(num) {
      this.currentPage = num
      ///console.log('5555', num)
      ///console.log(this.tableData)
      if (this.type === 1) {
        this.http(num) //商品列表分页
      } else {
        //搜索分页
        //console.log('搜索分页操作')
        this.tableData = this.list.slice((num - 1) * 3, num * 3)
      }
    },
    /* 
      商品列表的获取
   */
    http(page) {
      this.$api
        .getGoodsList({
          page
        })
        .then(res => {
          // console.log(res.data)
          if (res.data.status === 200) {
            this.tableData = res.data.data //数据列表
            this.total = res.data.total
            this.pageSize = res.data.PageSize
            // console.log('999999', this.$refs.change.change())
          }
        })
    },
    /* 
       搜索框编辑
    */
    changeGoods() {}
  },
  created() {
    this.http(1)
  }
}
</script>

<style lang="less" scoped>
.goods {
  margin: 20px;
}
.header {
  display: flex;
  button {
    margin-left: 20px;
  }
}
.wrapper {
  margin-top: 20px;
}
</style>