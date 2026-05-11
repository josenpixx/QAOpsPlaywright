const Person = require('./basics7')
// console.log(day.length);
// let daySliced = day.slice(0,4);
// console.log(daySliced);
// console.log(day[1]);
// let splitDay = day.split("s");
// console.log(splitDay[1].length);
// console.log(splitDay[1].trim().length);

// let date = '23';
// let nextDate = '28';
// let diff = parseInt(nextDate - date);
// console.log(diff);
// diff.toString();


// console.log(newQuote);
// let val = newQuote.indexOf("day",5);
// console.log(val);


//tuesday is Funday

let day = 'tuesday ';
let newQuote = day + "is Funday day";
let count = 0;
let value = newQuote.indexOf("day");

while(value!== -1) 
{
    count++
    value = newQuote.indexOf("day", value+1)
}
console.log(count);

let person = new Person("Chris","Edward");
console.log(person.fullName());