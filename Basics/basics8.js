const Person = require('./basics7')


class Pet extends Person
{
    get location()
    {
        return "BlueCross"
    }
    constructor(firstName, lastName){
        super(firstName, lastName)
    }
}

let pet = new Pet('Lucky','Jack');
pet.fullName();
console.log(pet.location);