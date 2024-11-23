//클래스 상속 및 다형성

class Train {
    constructor(color, lightsOn) {
        this.color = color;
        this.lightsOn = lightsOn;
    }

    toggleLights() {
        this.lightsOn = !this.lightsOn;
    }

    lightsStatus() {
        console.log('Lights on?', this.lightsOn);
    }

    getSelf() {
        console.log(this);  // 'this'는 현재 객체를 참조
    }

    getPrototype() {
        let proto = Object.getPrototypeOf(this);
        console.log(proto);  // 프로토타입을 출력
    }
}

class HighSpeedTrain extends Train {
    constructor(passengers, highSpeedOn, color, lightsOn) {
        super(color, lightsOn);
        this.passengers = passengers;
        this.highSpeedOn = highSpeedOn;
    }
    toggleHighSpeed(){
        this.highSpeedOn = !this.highSpeedOn;
        console.log('High speed status:', this.highSpeedOn);
    }
    toggleLights(){
        super.toggleLights();
        super.lightsStatus();
        console.log('Lights are 100% operational.')
    }
}

let myTrain = new Train('blue', false);
let highSpeed1 = new HighSpeedTrain(200, false, 'green', false);

myTrain.toggleLights();
myTrain.lightsStatus();
myTrain.getPrototype();

highSpeed1.toggleLights();
highSpeed1.toggleHighSpeed();