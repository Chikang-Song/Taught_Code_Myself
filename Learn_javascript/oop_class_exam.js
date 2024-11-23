/*
OOP 에서의 클래스 상속 및 다형성 구현
*/

/*
Animal 클래스를 공통으로하고,
Cat과 Bird 두 클래스로 확장하며 고유속성 추가하고,
HouseCat, Tiger, Parrot 클래스를 확장하여 고유 메서드 및 속성을 추가
*/

class Animal {
    constructor(color = 'yellow', energy = 100) {
        this.color = color;
        this.energy = energy;
    }
    isActive() {
        if(this.energy > 0){
            this.energy -= 20;
            console.log('Energy is decreasing, currently at:', this.energy);
        } else {
            this.sleep();
        }
    }
    sleep(){
        this.energy += 20;
        console.log('Energy is increasing, currently at:', this.energy);
    }
    getColor(){
        console.log(this.color);
    }
}

class Cat extends Animal{
    constructor(sound='purr', canJumpHigh=true, canClimbTrees = true, color, energy) {
        super(color, energy);
        this.sound = sound;
        this.canJumpHigh = canJumpHigh;
        this.canClimbTrees = canClimbTrees;
    }
    makeSound() {
        console.log(this.sound);
    }
}

class Bird extends Animal {
    constructor(sound = 'chrip', canFly = true, color, energy){
        super(color, energy);
        this.sound = sound;
        this.canFly = canFly;
    }
    makeSound(){
        console.log(this.sound);
    }
}

class HouseCat extends Cat {
    constructor(houseCatSound = 'meow', sound, canJumpHigh, canClimbTrees, color, energy){
        super(sound, canJumpHigh, canClimbTrees, color, energy);
        this.houseCatSound = houseCatSound;
    }
    makeSound(option){
        if (option){
            super.makeSound();
        }
        console.log(this.houseCatSound);
    }
}

class Tiger extends Cat {
    constructor(tigerSound = 'Roar!', sound, canJumpHigh, canClimbTrees, color, energy){
        super(sound, canJumpHigh, canClimbTrees, color, energy);
        this.tigerSound = tigerSound;
    }
    makeSound(option){
        if (option) {
            super.makeSound();
        }
        console.log(this.tigerSound);
    }
}

class Parrot extends Bird {
    constructor(canTalk = false, sound, canFly, color, energy){
        super(sound, canFly, color, energy);
        this.canTalk = canTalk;
    }
    makeSound(option) {
        if (option) {
            super.makeSound();
        }
        if (this.canTalk) {
            console.log('Hi, I can talk!');
        }
    }
}

let polly = new Parrot(true); //canTalk=true
polly.makeSound(true);

let coy = new HouseCat();
coy.makeSound();

