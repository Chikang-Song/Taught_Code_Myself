class StationaryBike {
    constructor(position, gears){
        this.position = position;
        this.gears = gears;
    }
}

class Treadmill {
    constructor(position, modes) {
        this.position = position;
        this.modes = modes;
    }
}

class Gym {
    constructor(openHrs, StationaryBikePos, TreadmillPos) {
        this.openHrs = openHrs;
        this.stationaryBike = new StationaryBike(StationaryBikePos, 8);
        this.treadmill = new Treadmill(TreadmillPos, 5);
    }
}

var boxingGym = new Gym('7-22', 'right conner', 'left conner');

console.log(boxingGym.openHrs);
console.log(boxingGym.stationaryBike)
console.log(boxingGym.treadmill);