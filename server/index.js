// 搭建express服务
const express = require('express')
const app = express()
//post 请求表单数据
app.use(express.urlencoded({ extended: true }))

//静态文件托管 否则访问不到upload下的静态文件图片数据 ---localhost:8989/xx.jpg
app.use(express.static('upload'))

// 路由
const router = require('./router')

app.use('/api', router)

app.listen(8989, () => {
  console.log(8989)
})
