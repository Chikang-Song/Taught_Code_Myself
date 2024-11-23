// Programming Assignment: Building an object-oriented program


//Task1. Code a Person class

class Person {
    constructor(name='Tom',age=20,energy=100){
        this.name = name;
        this.age = age;
        this.energy = energy;
    }
    sleep(){
        this.energy += 10;
    }
    doSomethingFun(){
        this.energy -= 10;
    }
}

//Task2. Code a Worker class
class Worker extends Person {
    constructor(name, age, energy,xp=0, hourlyWage=10){
        super(name, age, energy);
        this.xp = xp;
        this.hourlyWage = hourlyWage;
    }
    goToWork(){
        this.xp += 10;
    }
}

//Task3. Code a intern object

function intern(){
    let intern = new Worker('Bob',21,110);
    intern.goToWork()
    return intern;
}

//Task4. Code a manger object
function manager(){
    let manager = new Worker('Alice',30,120,100,30);
    manager.doSomethingFun()
    return manager;
}

console.log(intern());
// Object.keys values를 이용한 속성접근방법
const a = intern();
console.log(Object.keys(a));
console.log(Object.values(a));

console.log(manager());
const m = manager();
console.log(Object.keys(m));
console.log(Object.values(m));

//for...of를 이용한 속성 접근방법
for (const [key, value] of Object.entries(m)){
    console.log(key, ":", value);
}
