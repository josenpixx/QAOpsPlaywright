let person = {
    firstName:'Tim',
    lastName:"Joe",
    age: 24,
    fullName: function()
    {
        console.log(this.firstName+this.lastName)
    }
}

console.log(person.fullName());
// console.log(person.lastName);
// console.log(person['firstName']);

// person.firstName = 'Fofiechev Maxim';
// console.log(person.firstName);
// person.sex = 'male';
// console.log(person);
// delete person.sex;
// console.log(person);

// console.log('gender' in person);

// for(let key in person)
// {
//     console.log(person[key])
// }