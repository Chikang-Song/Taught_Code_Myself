// class - Encapsulation: 캡슐화

class Car {
    constructor (model) {
        this.model = model;
        let speed = 0; // 캡슐화된 변수

        this.accelerate = function (){
            speed += 10;
            console.log(`${this.model} is going ${speed} km/h`);
        }
    }
}

let myCar = new Car('Santafe')

console.log(myCar.speed)
myCar.accelerate()
myCar.accelerate()