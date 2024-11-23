// 속성 덮어쓰기 Overriding

let bird = {
    hasWings : true,
    canFly : true,
    hasFeathers : true,
};

let eagle = Object.create(bird)
let penguine = Object.create(bird)

// penguine은 못난다 이를 overriding해보자
penguine.canFly = false;

console.log("Penguine canFly:",penguine.canFly);
console.log("Eagle canFly:",eagle.canFly);