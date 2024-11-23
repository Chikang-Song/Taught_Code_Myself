//Object와 그의 메서드

//Object.keys()
const drone = {speed:100, color:'red'};
const result = [];
Object.keys(drone).forEach(key => {
    result.push(key, drone[key]);
})

//Object : Map
let bestBoxers = new Map();
bestBoxers.set(1, 'The Champion');
bestBoxers.set(2, 'The Runner-up');
console.log(bestBoxers.get(1));

// Set
const repetitiveFruits = ['apple','pear','apple','plum'];
const uniqueFruits = new Set(repetitiveFruits);
console.log(uniqueFruits)