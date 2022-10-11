<template>
  <!-- 
        ref="upload" 获取dom元素 --upload
        action	必选参数，上传的地址
        on-preview	点击文件列表中已上传的文件时的钩子 function(file)
        on-remove	文件列表移除文件时的钩子
        on-success	文件上传成功时的钩子	function(response, file, fileList)
        on-error	文件上传失败时的钩子	function(err, file, fileList)
        on-progress	文件上传时的钩子	function(event, file, fileList)
        auto-upload	是否在选取文件后立即进行上传	(默认为true)
        file-list	上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}] 
        :action="url"
  -->
  <el-upload
    class="upload-demo"
    ref="upload"
    :on-preview="handlePreview"
    :action="url"
    :on-remove="handleRemove"
    :on-success="successUpload"
    :file-list="fileList"
    :auto-upload="false"
  >
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
  </el-upload>
</template>

<script>
import base from '../../api/base'
export default {
  data() {
    return {
      url: base.uploadUrl, //图片地址服务器
      fileList: []
    }
  },
  methods: {
    //文件是否上传成功
    successUpload(res, file, fileList) {
      // console.log('上传成功', res, file, fileList)
      this.$message({
        message: '图片上传成功',
        type: 'success'
      })
      //把成功的数据接口 传递给父组件
      // console.log('',res.url)
      let imgUrl = base.host + '/' + res.url.slice(7)
      this.$emit('sendImgUrl', imgUrl)
    },
    //点击上传文件到服务器 submit---el-upload自带的methods
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    }
  }
}
</script>

<style>
</style>