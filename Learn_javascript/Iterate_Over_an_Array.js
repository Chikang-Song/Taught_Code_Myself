// Task: Iterate Over an Array

//Step 1. You are given an array of dairy products:
// Task 1
var dairy = ['cheese', 'sour cream', 'milk', 'yogurt', 'ice cream', 'milkshake'];

function logDairy(){
    for (item of dairy) {
        console.log(item);
    }
}

logDairy();


// Task 2
const animal = {canJump: true};
const bird = Object.create(animal);
bird.canFly = true;
bird.hasFeathers = true;

function birdCan() {
    for (let [key, value] of Object.entries(bird)) {
        console.log(`${key}: ${value}`);  // 콜론 뒤에 공백 추가
    }
}
birdCan();

// Task 3
function animalCan() {
    for (let prop in bird) {
        console.log(`${prop}: ${bird[prop]}`);  // 콜론 뒤에 공백 추가
    }
}

animalCan();