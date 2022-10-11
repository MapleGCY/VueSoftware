let arr = inputArray.toString()
//console.log(arr)
let array = arr.split('')
//console.log(array)
for (let i = 0; i < array.length; i++) {
  if (array[i] == 'a') {
    array[i] = 'A'
  } else if (array[i] == 'e') {
    array[i] = 'E'
  } else if (array[i] == 'o') {
    array[i] = 'O'
  } else if (array[i] == 'u') {
    array[i] = 'U'
  } else if (array[i] == 'i') {
    array[i] = 'I'
  } else {
    //console.log(array[i])
    array[i] = array[i].toLowerCase()
  }
}
array = array.join('')
console.log(array)
