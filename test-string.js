/*
1. valueOf()，toString()
2. push()，pop()      <1>.改变原数组 
3. shift()，unshift()    <1>.改变原数组 
4. join()   将数组变为字符串，返回字符串，不改变原数组
5. concat()  不改变原数组
6. reverse() 改变原数组
7. slice()  Array.prototype.slice.call(document.querySelectorAll("div"));Array.prototype.slice.call(arguments);
8. splice()
9. sort()  默认按字典序排序
10. map()  map(function(elem,index,array){}，arr) 其中function为callback回调函数,返回 一个由返回值组成的数组。arr:如果回调函数中存在this,则this为arr
11. forEach()
12. filter()
13. some()，every()
14. reduce()，reduceRight()
15. indexOf()，lastIndexOf()
链式使用
 */
var array = [1, 2, 3]
var array1 = [5, 5, 5]
// 1.valueOf
console.log(array.valueOf())
console.log(typeof array[0].valueOf())
console.log(array.toString())
console.log(array.push({}))
console.log(array.pop())
console.log(array)
console.log(array.shift())
console.log(array.unshift('2'))
console.log(array)
console.log(array.join(''))
console.log(array)
console.log(array.concat(array1))
console.log(array)
console.log(array.reverse())
console.log(array)
console.log(array.slice(0))
console.log(array.slice(0, 1))
console.log(array.splice(0, 1, 4)) /* 插在选中元素的前面 */
console.log(array)
// console.log(array.splice(1)) /* 只传入一个值，则删除从当前值开始到后面所有值 */
console.log(array)
console.log(array.sort())
console.log(
  array.map(function (elem, index, arr) {
    console.log('map中的数组', arr)
    return this[index]
  }, array)
)
console.log(1)
console.log('1')
array.forEach((item, index, array) => {
  console.log('array', array)
  console.log(item, index)
  item = item * 2
})
console.log(array)
console.log(
  array.filter((item, index, array) => {
    console.log('filter-array', array)
    return item > 2
  })
)
var array2 = [0, 1]
console.log(array2.indexOf(false))
