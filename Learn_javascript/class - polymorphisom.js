//class - polymorphism 다형성

// 메서드나 속성이 다른 객체에서 다르게 동작할 수 있는 원칙

class Bird {
    useWings(){
        console.log('Get Ready!');
    }
}

class Eagle extends Bird {
    useWings(){
        super.useWings();
        console.log('Soaring!');
    }
}

class Penguin extends Bird {
    useWings(){
        super.useWings();
        console.log('Swimming!');
    }
}

let eagle = new Eagle();
let penguine = new Penguin();

eagle.useWings();
penguine.useWings();