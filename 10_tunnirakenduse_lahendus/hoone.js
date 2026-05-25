"use strict";
class MaterialAmount {
    constructor(mass, specificHeatCapacity, temperature) {
        this.mass = mass;
        this.specificHeatCapacity = specificHeatCapacity;
        this.temperature = temperature;
    }
    getTemperature() {
        return this.temperature;
    }
    changeEnergy(joules) {
        this.temperature += joules / (this.specificHeatCapacity * this.mass);
    }
}
class RoomAir extends MaterialAmount {
    constructor(length, width, height, temperature) {
        const AIR_SPECIFIC_HEAT = 1012; // J/(kg*K)
        const AIR_DENSITY = 1.23; // kg/m³
        const volume = length * width * height;
        const mass = volume * AIR_DENSITY;
        super(mass, AIR_SPECIFIC_HEAT, temperature);
        this.length = length;
        this.width = width;
        this.height = height;
    }
    getVolume() {
        return this.length * this.width * this.height;
    }
}
const waterPot = new MaterialAmount(3, 4200, 20);
waterPot.changeEnergy(10000);
console.log(waterPot.getTemperature());
const ironRadiator = new MaterialAmount(10, 412, 20);
ironRadiator.changeEnergy(10000);
console.log(ironRadiator.getTemperature());
if (ironRadiator.getTemperature() > waterPot.getTemperature()) {
    const changeAmount = 1000;
    ironRadiator.changeEnergy(-changeAmount);
    waterPot.changeEnergy(changeAmount);
}
console.log(waterPot.getTemperature() + " " + ironRadiator.getTemperature());
const room = new RoomAir(3, 4, 2.5, 20);
room.changeEnergy(100000);
console.log("Toa temperatuur pärast 100000 J:", room.getTemperature());