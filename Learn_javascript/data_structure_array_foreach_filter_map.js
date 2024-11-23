
// Array와 그의 주요 메소드

const myArray = [10, 20, 30, 40, 50, 60];

// Array: foreach
myArray.forEach((myArray, index) => {
    console.log((`${index}. ${myArray}`))
})


// Array: filter
const myfilterNums = myArray.filter(num => num > 20);
console.log(myfilterNums)

// Array: map
const myMapNums = myArray.map(myArray => myArray/20);
console.log(myMapNums);