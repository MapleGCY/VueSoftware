<template>
  <div id="main"></div>
</template>

<script>
import E from 'wangeditor'
export default {
  data() {
    return {
      editor: ''
    }
  },
  mounted() {
    this.editor = new E('#main')
    //取消自动 focus
    this.editor.config.focus = false
    this.editor.config.onchange = newHtml => {
      // console.log('change 之后最新的 html', newHtml)
      //把输入的内容传给父组件---弹框组件
      this.$emit('sendWangEditor', newHtml)
    }
    //配置触发 onchange的时间频率，默认为 200ms
    this.editor.config.onchangeTimeout = 500
    this.editor.config.menus = [
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      'backColor', // 背景颜色
      'link', // 插入链接
      'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      'emoticon', // 表情
      'image', // 插入图片
      'table', // 表格
      'video', // 插入视频
      'code', // 插入代码
      'undo', // 撤销
      'redo' // 恢复
    ]
    this.editor.create()
  }
}
</script>

<style>
</style>