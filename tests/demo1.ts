let message1 : string = "Hello";
message1 = 'bye';
console.log(message1);
let age1:number = 20;
console.log(age1);
let isActive: boolean = false;
console.log(isActive);
let numberArray : number [] = [1,2,3,4,5];
console.log(numberArray);
let data: any = "this can be any type";
data = 42;
console.log(data);

function add(x: number, y: number): number 
{
    return x + y;
}

add(5, 10);

let user: {name: string, age: number} = { name: "Bob", age: 30};

