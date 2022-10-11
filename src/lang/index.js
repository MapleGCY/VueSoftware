import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Element from 'element-ui'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import English from './en'
import Chinese from './chinese'

Vue.use(VueI18n)

//准备语言
const messages = {
  //1. 中文
  en: {
    ...English,
    //导入element-ui里面的国际化语法
    ...enLocale
  },
  //2. 英文
  zh: {
    ...Chinese,
    ...zhLocale
  }
}

//通过选项创建 VueI18n 实例
const i18n = new VueI18n({
  locale: 'zh', // 设置地区
  messages // 设置地区信息  如果是messages就简写，不是则通过messages:{xxxx}配置
})

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})

//导出i18n
export default i18n
