// let marks = [20,40,35,12,37,100];
// console.log(marks[2]);
// marks[3]=14;
// console.log(marks);
// console.log(marks.length);
// marks.push(69);
// console.log(marks);
// marks.pop();
// console.log(marks);
// marks.unshift(34);
// console.log(marks);
// console.log(marks.indexOf(14));
// console.log(marks.includes(100));
// let subMarks = marks.slice(2,5);
// console.log(subMarks);

// let sum = 0;

// for(let i = 0; i<marks.length; i++)
// {
//     //console.log(marks[i])
//     sum = sum + marks[i]
    
// };
// console.log(sum);

// let total = marks.reduce((sum, fullSumma)=> sum+fullSumma,0)
// console.log(total);

// let scores = [12,13,14,16];
// let newScores = [];

// for(let i=0; i<scores.length; i++)
//     {
//         if(scores[i]%2 == 0) {
//             newScores.push(scores[i])
//         }
            
//     };
//     console.log(newScores); 

//     let finalScore = scores.filter(score=>score%2==0);
//     console.log(finalScore);

//     let mapArray = finalScore.map(score=>score*3);
//     console.log(mapArray);

//     const finGin = mapArray.reduce((bum, fullBum)=> bum+fullBum, 0);
//     console.log(finGin);

    // let score1 = [12,15,23,42,56,79];
    // let megaBoom = score1.filter(score=>score%2==0).map(score=>score*4).reduce((boom, megaSum)=> boom + megaSum, 0);
    // console.log(megaBoom);

    let fruits = ["Banana", "Mango", "Pomegrante", "Apple"];
    fruits.sort();
    console.log(fruits);

    let scoresDigits = [12,3,19,16,14];
    console.log(scoresDigits.sort((a,b)=> a-b));

    console.log(scoresDigits.reverse());
    console.log(fruits.reverse());
       
