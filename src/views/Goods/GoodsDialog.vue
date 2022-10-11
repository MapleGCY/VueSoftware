<template>
  <div>
    <!-- 
          title="添加商品" 弹框的标题
          :visible.sync="dialogVisible" 是否展示弹框
          width="70%" 宽度大小
    -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
      <!-- 内容区域 -->
      <!-- 下面删除了ref="ruleForm" -->
      <el-form :model="goodsForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="类目选择" prop="category">
          <el-button type="primary" @click="changeCategory">类目选择</el-button>
          <span style="margin-left:20px">{{goodsForm.category}}</span>
        </el-form-item>
        <el-form-item label="商品名称" prop="title">
          <el-input v-model="goodsForm.title"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="goodsForm.price"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="num">
          <el-input v-model="goodsForm.num"></el-input>
        </el-form-item>

        <el-form-item label="发布时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="选择日期" v-model="goodsForm.date1" style="width: 100%"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker placeholder="选择时间" v-model="goodsForm.date2" style="width: 100%"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="商品卖点" prop="sellPoint">
          <el-input v-model="goodsForm.sellPoint"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" prop="image">
          <el-button type="primary" @click="innerVisibleImg=true">上传图片</el-button>
          <img style="width: 200px; margin-left: 20px; vertical-align: middle" :src="goodsForm.image" alt />
        </el-form-item>
        <el-form-item label="商品描述" prop="descs">
          <WangEditor @sendWangEditor="sendWangEditor" ref="myEditor"></WangEditor>
        </el-form-item>
      </el-form>

      <!-- 弹框底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>

      <!-- 1.  内弹框---类目选择弹框 -->
      <el-dialog width="30%" title="添加类目" :visible.sync="innerVisible" append-to-body>
        <CategoryDialog @sendTreeData="sendTreeData"></CategoryDialog>
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible=false">取 消</el-button>
          <el-button type="primary" @click="showTreeData">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 2.  内弹框---上传图片弹框 -->
      <el-dialog width="30%" title="上传图片" :visible.sync="innerVisibleImg" append-to-body>
        <ImgDialog @sendImgUrl="sendImgUrl"></ImgDialog>
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisibleImg=false">取 消</el-button>
          <el-button type="primary" @click="showImage">确 定</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import CategoryDialog from './CategoryDialog.vue'
import ImgDialog from './ImgDialog.vue'
import WangEditor from './WangEditor.vue'
export default {
  components: {
    CategoryDialog,
    ImgDialog,
    WangEditor
  },
  props: ['dialogVisible', 'title', 'rowData'],
  data() {
    return {
      innerVisible: false,
      innerVisibleImg: false,
      imageUrl: '',
      treeData: {},
      goodsForm: {
        category: '',
        title: '',
        price: '',
        num: '',
        sellPoint: '',
        image: '',
        cid: '',
        descs: '',
        date1: '',
        date2: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    /*  
       通知Goods.vue 是否显示 弹框添加表
    */
    changeDialog() {
      this.$emit('changeDialog')
    },
    /* 
        显示类目选择结果
    */
    showTreeData() {
      this.innerVisible = false
      //显示数据
      this.goodsForm.category = this.treeData.name
      this.goodsForm.cid = this.treeData.cid
    },
    /* 
       类目选择(CategoryDialog.vue)传输来的选择后数据
    */
    sendTreeData(data) {
      console.log('tree数据', data)
      this.treeData = data
    },
    /* 
       打开类目选择框
    */
    changeCategory() {
      this.innerVisible = !this.innerVisible
    },
    /* 
      显示图片url
    */
    sendImgUrl(val) {
      //console.log('图片地址', val)
      this.imageUrl = val
    },
    /* 
       显示上传图片
    */
    showImage() {
      this.goodsForm.image = this.imageUrl
      this.innerVisibleImg = false
    },
    /* 
       富文本编译器中的内容
    */
    sendWangEditor(value) {
      // console.log(value)
      this.goodsForm.descs = value
    },

    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          //参数： title cid category sellPoint price num desc paramsInfo image
          let { title, cid, category, sellPoint, price, num, descs, image, id } = this.goodsForm
          //console.log(this.goodsForm)
          if (this.title === '添加商品') {
            //  console.log('添加商品')
            this.$api.addGoods({ title, cid, category, sellPoint, price, num, descs, image }).then(res => {
              //console.log('添加---实现', res.data)
              if (res.data.status === 200) {
                //成功

                this.$parent.http(1) //2.更新父组件列表数据
                this.$message({
                  message: '添加商品成功',
                  type: 'success'
                })
                //清空表单数据
                this.handleClose()
              } else {
                this.$message.error('添加商品失败')
              }
            })
          } else {
            this.$api.changeGoods({ title, cid, category, sellPoint, price, num, descs, image, id }).then(res => {
              //console.log('添加后的数据', res.data)
              if (res.data.status === 200) {
                //成功

                this.$parent.http(1) //2.更新父组件列表数据
                this.$message({
                  message: '编辑商品成功',
                  type: 'success'
                })
                //清空表单数据
                this.handleClose()
              } else {
                this.$message.error('编辑商品失败')
              }
            })
          }
        } else {
          console.log('error cubmit!!')
          return false
        }
      })
    },
    /* 
      清空弹框中的数据
    */
    handleClose() {
      this.$emit('changeDialog') //1.关闭弹窗
      //2.清空表单   2.1使用element里面的重置表单 2.2 自己手动初始化goodsForm  !!!富文本编译内容都需要手动清
      //element-ui 表单自带resetFields()
      //this.$refs.ruleForm.resetFields() 会删除当前选中数据
      this.goodsForm = { category: '', title: '', price: '', num: '', sellPoint: '', image: '', cid: '', descs: '', date1: '', date2: '' }
      //清空富文本编译框中内容
      this.$refs.myEditor.editor.txt.clear()
    }
    /* 
      父元素传递消息执行编辑商品
    
    */
  },
  //监听器
  watch: {
    rowData(val) {
      this.goodsForm = val
      //设置富文本编译的默认内容
      this.$nextTick(() => {
        //  console.log('this.$refs.myEditor', this.$refs.myEditor)
        this.$refs.myEditor.editor.txt.html(val.descs)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.line {
  text-align: center;
}
</style>