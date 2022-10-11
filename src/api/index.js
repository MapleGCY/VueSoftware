/* 
  请求方法
*/
import axios from 'axios'
import base from './base'
//node.js
const qs = require('querystring')
const api = {
  /* 
      商品列表
    */
  getGoodsList(params) {
    //{page:xxx}
    return axios.get(base.goodsList, {
      params
    })
  },
  /* 
     搜索商品数据
     search
  */
  getSearch(params) {
    //{search:xx}
    return axios.get(base.search, {
      params
    })
  },
  /* 
     获取类目结构选择
     {id:cid}
  */
  getSelectCategory(params) {
    return axios.get(base.selectCategory, {
      params
    })
  },
  /* 
    添加商品
  */
  addGoods(params) {
    //参数： title cid category sellPoint price num desc paramsInfo image
    return axios.get(base.addGoods, {
      params
    })
  },
  /* 
   删除数据
  */
  deleteGoods(params) {
    return axios.get(base.deleteGoods, {
      params
    })
  },
  /* 
   编辑数据
  */
  changeGoods(params) {
    return axios.get(base.changeGoods, {
      params
    })
  },
  /* 
    登录
  */
  getLogin(params) {
    //params={username:"",password:""}
    //console.log('9999', params, qs.stringify(params))
    return axios.post(base.login, qs.stringify(params))
  },
  /* 
    params表格内容
  */
  getParams(params) {
    return axios.get(base.paramsList, {
      params
    })
  },
  /* 
     搜索params内容
  */
  paramsSearch(params) {
    return axios.get(base.paramsSearch, {
      params
    })
  }
}
export default api
