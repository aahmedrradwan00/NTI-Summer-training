console.log('Ahmed');

let n: number = 1;

let massage: string;
massage = 'ahmed';
let bo: boolean;

bo = true;

console.log(sayHello()); // This works because function declarations are hoisted

function sayHello() {
    console.log('hello');
    return 'Ahme`1d';
}

const sayHello2 = function (): string {
    console.log('hello');
    return 'Ahme`1d';
};

console.log(sayHello2());

const user: {
    name: string;
    age: Mix;
    gender: Gender;
} = {
    name: 'ahmed',
    age: 21,
    gender: 'male',
};
console.log(user.gender);

// type Alise
type Mix = string | number;

//Literal type
type Gender = 'male' | 'female';

type User = {
    readonly id: number;
    name: string;
    email?: string;
    age: Mix;
    gender: Gender;
};

interface User2 {
    readonly id: number;
    name: string;
    email?: string;
    age: Mix;
    gender: Gender;
}

const user1: Profile = {
    id: 1,
    name: 'Ali',
    age: 22,
    gender: 'male',
    image: 'AA',
};
const user2: User2 = {
    id: 2,
    name: 'Nada',
    age: '29',
    gender: 'female',
};

user1.age = 30;
// readonly cant udpated
// user1.id=10;

//cant
// type User:{}
// reopen and upadte
interface User2 {
    // username: string;
}

interface Profile extends User2 {
    image: string;
}

const sun = <T extends number, T2 extends number>(n1: T, n2: T2): number => {
    console.log(n2);
    return n1 + n2;
}
// const sun = <T = number, T2 = string>(n1: T, n2: T2): T => {
//     console.log(n2);
//     return n1+n2;
// };
console.log(sun<number, number>(4, 1));

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
    constructor(public color: string) {
        console.log('inside constructor');
        console.log(`Car color is ${this.color}`);
    }
    MaxSpeed(speed: number): string {
        return `Car Max Speed is ${speed} `;
    }
}

const car2: Car = new Car('Red');
console.log(car2.MaxSpeed(200));

class Ford extends Car {
    constructor(private name: string, public color: string) {
        super(color);
        // name not this.name bc we in constructor
        console.log(`Car Name is ${name}`);
    }
}

const ford2: Ford = new Ford('c1', 'green');

console.log(ford2.color);
