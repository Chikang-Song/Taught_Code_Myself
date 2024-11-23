const car = {speed: 'fast'};
const sportsCar = Object.create(car);
sportsCar.color = 'red';
sportsCar.seat = 2;

for (let key of Object.keys(sportsCar)) {
    console.log(key, ':', sportsCar[key])
}

for (let [key, value] of Object.entries(sportsCar)){
    console.log(key, ':', value);
}