### 后台管理系统
  
   一个后台管理系统，包含商品管理 用户管理 订单 用户登录等等信息

前端开发内容：
   PC端(比如：京东)   移动端（手机预览的网页）  小程序   后台管理界面


后台开发：
   服务器： 后台语言 java、 php、 python 、大数据、人工智能

架构师 --- 技术总监

前后端分离;
   用户--->前端-视图-数据----->后台-提供接口 --->数据库
### 技术点
  Vue + Vue-router + Vuex + Element-ui + Axios + Echarts + 其它三方库


###VueSoftware没用，多传的
### 项目搭建
1. vue create vue_admin
2. vue-router vuex
3. axios  //cnpm i axios --save
4. vue add element --(按需)
5. npm install less less-loader --save
6. npm i element-ui
7. 数据库中添加ego.sql文件



### 项目初始化
1. 删除无用组件 home.vue about.vue HelloWorld...
2. css初始化
3. inconfont 图标引入



### 后台服务
1. node.js服务
2. express
3. jwt(生成token)  jsonwebtoken  解析token:安装 jwt-decode
4. mysql



### 导入数据步骤
1. 在server目录下nodemon(先执行npm install --save-dev nodemon再nodemon)连接数据库获取数据，在打开另一个终端
2. ctrl+c (y) 终止服务
3. cnpm i express -S
4. cnpm i mysql -S
5. npm run serve



###路由搭建
1.页面布局配置 同级登录界面


## 商品管理界面


## 类目选择


## 上传图片
1. Element-ui upload组件
2. 后台支持
3. npm install multer --save


### 富文本编辑
1. 百度编译器
2. wangEditor

wangEditor使用步骤 
1. 官网：https://www.wangeditor.com
2. 基本使用
       1. 安装：vue ==> npm install wangeditor
       2. 引入模块：
           import E from "wangeditor"  //E可以更改
       3. 使用wangeditor
           const editor = new E('#main')
           editor.create()
3. 常用配置
   1. 清空内容
      editor.txt.clear()

   2. 设置内容
      editor.txt.html()
   3. 配置菜单
      editor.config.menus()
   4. 回调函数（编辑器内容、选区变化时的回调函数)
      onchange函数 获取输入的值
      editor.config.onchange = function(newHtml){            // JS 语法
         console.log("change 之后最新的 html",newHtml)
      }
      //配置触发 onchange的时间频率，默认为 200ms
      editor.config.onchangeTimeout = 500\


### 国际化 vue i18n
1. 介绍
   Vue I18n 是 Vue.js 的国际化插件。它可以轻松地将一些本地化功能集成到你的 Vue.js 应用程序中。
2. 安装
   1. npm install vue-i18n  或者 yarn add vue-i18n
     报如下错误。改为：npm install vue-i18n --legacy-peer-deps
     当前vue i18n版本存在与vue2版本冲突 所以cnpm i vue-i18n@8.26.7 -S  
     (
      npm ERR! While resolving: vue_manage@0.1.0
      npm ERR! Found: vue@2.7.10
      npm ERR! node_modules/vue
      npm ERR!   vue@"^2.6.14" from the root project
      )
   2.  main.js中导入或者配单独文件
          import Vue from 'vue'
          import VueI18n from 'vue-i18n'
          Vue.use(VueI18n)

3. 使用步骤
  1. 如果使用模块系统 (例如通过 vue-cli)，则需要导入 Vue 和 VueI18n ，然后调用 Vue.use(VueI18n)。
     // import Vue from 'vue'
     // import VueI18n from 'vue-i18n'
     //
     // Vue.use(VueI18n)
  2. 准备翻译的语言环境信息 
    const messages = {
         en: { //英文
            message: {  //表示页面，可以自己取名
               hello: 'hello world'   //左侧属性，右侧值
            }，// message和goods表示不同页面
            goods:{

            }
         },
         ja: { //中文
            message: {
               hello: '你好 世界'
            }
         }
      }
   3. 通过选项创建 VueI18n 实例
      const i18n = new VueI18n({
            locale: 'ja', // 设置地区
            messages, // 设置地区信息 如果是messages就简写，不是则通过messages:{xxxx}配置
      })
   4. 通过 `i18n` 选项创建 Vue 实例
      new Vue({ i18n }).$mount('#app')
   5. 使用语法
    <p>{{ $t("message.hello") }}</p>


### element 国际化
1. 导入 
   import Element from 'element-ui'

2. 导入语言环境
   import enLocale from 'element-ui/lib/locale/lang/en'
   import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

   目前 Element 内置了以下语言：

    简体中文（zh-CN）
    英语（en）
    德语（de）
    葡萄牙语（pt）
    西班牙语（es）
    丹麦语（da）
    法语（fr）
    ....
   
3. 配置语言环境
   const messages = {
     en: {
        message: 'hello',
        ...enLocale // 或者用 Object.assign({ message: 'hello' }, enLocale)
      },
     zh: {
        message: '你好',
         ...zhLocale // 或者用 Object.assign({ message: '你好' }, zhLocale)
      }
   }
4. 配置使用
   Vue.use(Element, {
      i18n: (key, value) => i18n.t(key, value)
    })


### 登录拦截


### Echarts
1. 安装：npm install echarts -S
2. 使用方式
   1. 导入echarts在组件里使用
   2. 导入全局 挂载原型 全局使用
   3. 开发成vue组件


3. 使用 --main.js
   1. import * as echarts from "echarts"
      vue.prototype.$echarts =echarts
   2. 直接使用
      this.$echarts.xxxx
