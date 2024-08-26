"use strict";
console.log('Ahmed');
let n = 1;
let massage;
massage = 'ahmed';
let bo;
bo = true;
console.log(sayHello()); // This works because function declarations are hoisted
function sayHello() {
    console.log('hello');
    return 'Ahme`1d';
}
const sayHello2 = function () {
    console.log('hello');
    return 'Ahme`1d';
};
console.log(sayHello2());
const user = {
    name: 'ahmed',
    age: 21,
    gender: 'male',
};
console.log(user.gender);
const user1 = {
    id: 1,
    name: 'Ali',
    age: 22,
    gender: 'male',
    image: 'AA',
};
const user2 = {
    id: 2,
    name: 'Nada',
    age: '29',
    gender: 'female',
};
user1.age = 30;
const sun = (n1, n2) => {
    console.log(n2);
    return n1 + n2;
};
// const sun = <T = number, T2 = string>(n1: T, n2: T2): T => {
//     console.log(n2);
//     return n1+n2;
// };
console.log(sun(4, 1));
// class Car {
//     private color: string = '';
//     constructor(color: string) {
//         console.log('inside constructor');
//         this.color = color;
//         console.log(`Car color is ${this.color}`);
//     }
// }
// const car2: Car = new Car('Red');
class Car {
    // constructor(private color: string) {
    // public to extend
    constructor(color) {
        this.color = color;
        console.log('inside constructor');
        console.log(`Car color is ${this.color}`);
    }
    MaxSpeed(speed) {
        return `Car Max Speed is ${speed} `;
    }
}
const car2 = new Car('Red');
console.log(car2.MaxSpeed(200));
class Ford extends Car {
    constructor(name, color) {
        super(color);
        this.name = name;
        this.color = color;
        // name not this.name bc we in constructor
        console.log(`Car Name is ${name}`);
    }
}
const ford2 = new Ford('c1', 'green');
console.log(ford2.color);
