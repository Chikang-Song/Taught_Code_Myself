//사용자 정의 생성자 함수

function Icecream(flavor){
    this.flavor = flavor;
    this.meltIt = function(){
        console.log(`This ${this.flavor} icecream has melted`);
    };
}

let kiwiIcecream = new Icecream('kiwi');
let appleIcecream = new Icecream('apple');

kiwiIcecream.meltIt();
appleIcecream.meltIt();