//连接数据库--1.安装mysql 2.创建连接
const mysql = require('mysql')

//创建数据库连接
const client = mysql.createConnection({
  host: 'localhost', //数据库域名 地址
  user: 'root', //数据名称
  password: 'bingbian945', //数据库密码
  database: 'vuemanege'
  //port: '3306' 默认3306端口，不是再添加
})
if (!client) console.log('数据库连接失败')
else console.log('数据库连接成功')

//封装数据库操作语句 SQL语句 参数数组arr callback成功函数结果
function sqlFun(sql, arr, callback) {
  client.query(sql, arr, function (error, result) {
    if (error) {
      console.log('数据库语句错误')
      return
    }
    callback(result)
  })
}
module.exports = sqlFun
