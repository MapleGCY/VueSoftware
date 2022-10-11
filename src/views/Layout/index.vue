<template>
  <div class="layout">
    <!-- 左侧导航区域 -->
    <Navigation class="navi" :isCollapse="isCollapse"></Navigation>
    <Content class="content" :class="{isActive:isCollapse}" @changeCollapse="changeCollapse" :isCollapse="isCollapse"></Content>
    <!-- 右侧内容区域 -->
  </div>
</template>

<script>
import Navigation from './Navigation.vue'
import Content from './Content.vue'
export default {
  components: {
    Navigation,
    Content
  },
  data() {
    return {
      isCollapse: false
    }
  },
  methods: {
    changeCollapse() {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="less" scoped>
.layout {
  .navi {
    position: fixed;
    // width: 200px;
    // min-height: 500px;
    top: 0;
    bottom: 0;
    background-color: #1b3554;
  }
  .content {
    margin-left: 200px;
  }
  .isActive {
    margin-left: 64px;
  }
}
</style>