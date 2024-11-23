//class - Abstraction 추상화

class Phone {
    constructor(brand){
        this.brand = brand;
    }
    call(){
        console.log("Calling...");
    }
}

let myPhone = new Phone('iPhone');
myPhone.call();