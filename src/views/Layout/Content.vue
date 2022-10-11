<template>
  <div>
    <div class="header">
      <i v-if="!isCollapse" @click="changenavi" class="iconfont icon-right-indent"></i>
      <i v-else @click="changenavi" class="iconfont icon-left-indent"></i>
      <div class="header-right">
        <el-dropdown @command="changelang">
          <span class="el-dropdown-link">
            多语言
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh">中文</el-dropdown-item>
            <el-dropdown-item command="en">English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="user">
          欢迎： {{userinfo.user}}
          <i class="iconfont icon-icon-tuichu" @click="loginBack"></i>
        </div>
      </div>
    </div>
    <!-- 内容区域--路由出口 -->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import i18n from '@/lang/index'
import { mapState, mapMutations } from 'vuex'
export default {
  props: ['isCollapse'],
  computed: {
    ...mapState('loginModule', ['userinfo'])
  },
  methods: {
    ...mapMutations('loginModule', ['clearUser']),
    //退出登录
    loginBack() {
      //清空vuex数据
      this.clearUser()
      //清空本地存储
      localStorage.removeItem('user')
      //退出登录
      this.$router.push('/login')
    },
    changenavi() {
      //点击切换按钮 修改父组件数据 isCollapse
      this.$emit('changeCollapse')
    },
    changelang(command) {
      //console.log('555', command)
      this.$i18n.locale = command
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  height: 50px;
  line-height: 50px;
  background: #054476;
  color: #fff;
  .iconfont {
    font-size: 20px;
  }
}
.header-right {
  float: right;
  display: flex;
  margin-right: 20px;
  // background-color: #fff;
  .user {
    margin-left: 20px;
  }
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.iconfont {
  margin: 10px;
}
</style>