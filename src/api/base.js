/* 
  接口路径配置：
  一般文件目录：base.js index.js 
  但是公司不一样
  config(或者api)
     login index.js config.js
    index.js
    xxxx.js
*/

const base = {
  host: 'http://localhost:8989', //基础域名
  goodsList: '/api/api/projectList', //商品列表
  search: '/api/api/search', //商品搜索
  selectCategory: '/api/api/backend/itemCategory/selectItemCategoryByParentId', //类目结构选择
  uploadUrl: '/api/api/upload', //图片上传post请求
  addGoods: '/api/api/backend/item/insertTbItem', //商品添加
  deleteGoods: '/api/api/backend/item/deteItemById', //删除商品
  changeGoods: '/api/api/backend/item/updateTbItem', //编辑商品
  login: '/api/api/login', //登录
  paramsList: '/api/api/backend/itemParam/selectItemParamAll', //params表格内容
  paramsSearch: '/api/api/params/search' //params搜索内容
}

export default base
