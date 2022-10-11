import store from '../store/index'
//持久化
let user = localStorage.getItem('user')
if (user) {
  user = JSON.parse(user) //转化为对象
  store.commit('loginModule/setUser', user)
}
