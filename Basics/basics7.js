module.exports =  class Person
{
    age = 25
    get location()
    {
        return "canada"
    }

constructor(firstName, lastName)
    {
    this.firstName = firstName
    this.lastName = lastName
    }   

fullName()
    {
        console.log(this.firstName+this.lastName)
    }
}

// let person = new Person('Josen', 'Pix');
// let person1 = new Person('Chris', 'Joseph')
// console.log(person.age);
// console.log(person.location);
// console.log(person.fullName());
// console.log(person1.fullName());