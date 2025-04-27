// const car ={ 
//     name: "Picun",
//     mark: "F6",
//     birth: 42,
//     isBroken: false,
//     beepBeep: function() {
//         console.log('Beep-Beep')
//     },
// }

// const CarsOwner = {
//     name: "Viktor",
//     surname: "Picun",
//     age: 1488,
//     cars: [car],
// }

// console.log(car);
// console.log(carsOwner);
// car.beepBeep();

// const people = [];
// people.push("Stepan");
// people.push("Petr");
// people.unshift("Alex");

// console.log(people);

const evens = [];   
const maxValue = 1000;
let i;
for(i = 0; i <= maxValue; ++i){
    if (i % 2 == 2){
         evens.push(i);
    }
}
console.log(evens);