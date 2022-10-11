<template>
  <div>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#1b3554"
      text-color="#fff"
      active-text-color="#054476"
      :collapse-transition="false"
      router
      :collapse="isCollapse"
    >
      <el-menu-item>
        <span slot="title">{{ $t('menu.vuemanage') }}</span>
      </el-menu-item>
      <el-menu-item index="/layout/home">
        <i class="el-icon-menu"></i>
        <!-- <span slot="title">首页</span> -->
        <span slot="title">{{ $t('menu.home') }}</span>
      </el-menu-item>
      <el-menu-item index="/layout/goods">
        <i class="el-icon-document"></i>
        <!-- <span slot="title">商品管理</span> -->
        <span slot="title">{{ $t('menu.goods') }}</span>
      </el-menu-item>
      <!-- <el-menu-item index="/layout/params">
        <i class="el-icon-setting"></i>
        <span slot="title">{{ $t('menu.params') }}</span>
      </el-menu-item>-->

      <el-submenu index="/layout/params">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{ $t('menu.params') }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/layout/params/specifications">
            <i class="el-icon-setting"></i>
            <span slot="title">{{$t('menu.specifications')}}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item index="/layout/advert">
        <i class="el-icon-setting"></i>
        <span slot="title">{{ $t('menu.advert') }}</span>
      </el-menu-item>

      <el-submenu index="/layout/order">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{ $t('menu.order') }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/layout/order/list">
            <i class="el-icon-setting"></i>
            <span slot="title">{{ $t('menu.orderlist') }}</span>
          </el-menu-item>
          <el-menu-item index="/layout/order/back">
            <i class="el-icon-setting"></i>
            <span slot="title">{{$t('menu.orderback')}}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
// import i18n from '@/lang'

export default {
  props: ['isCollapse'],
  data() {
    return {
      // isCollapse:flase
    }
  }
  // created() {
  //   this.$router.path = '/layout/home'
  //   console.log(this.$router.path)
  // }
}
</script>

<style lang="less" scoped>
.el-menu {
  border-right: 0;
  .is-active {
    background: #409eff !important;
    color: #fff !important;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>