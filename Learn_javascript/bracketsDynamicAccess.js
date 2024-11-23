// [] 브래킷 표기법을 사용한 객체의 속성접근법

function testBracketsDynamicAccess(){
    var dynamicKey;
    if(Math.random() > 0.5) {
        dynamicKey = 'speed';
    } else {
        dynamicKey = 'color';
    }

    var drone = {
        speed : 15,
        color : 'orange'
    }
    console.log(drone[dynamicKey]);
}

testBracketsDynamicAccess();