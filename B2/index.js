// Cau 1:
console.log("Cau 1");
const arr1 = [1, 2, 4, 5, 6],
    arr2 = [1, 6, 8, 9, 0],
    arr = [];
for (let i of arr1)
    arr.push(...arr2.filter(val => val === i))
console.log(arr);
// Cau 2
console.log("Cau 2");
console.log([1, 54, 6, 7].map(i => i + 5))
// Cau 3
console.log("Cau 3");
const m = [1, 2, 4, 5, 6, 7],
    n = [3, 5, 675, 8, 96]

const filterFunc = 
    e => 
        e !== 1 && 
        e !== 8 && 
        e !== 10 && 
        e !== 96 && 
        e !== 7
console.log(m.filter(filterFunc));
console.log(n.filter(filterFunc));
// Cau 4
console.log("Cau 4");
const players = [
    {
        id: 11,
        name: "Messi",
        age: 33
    },
    {
        id: 12, 
        name: "Ronaldo",
        age: 34
    },
    {
        id: 13, 
        name: "Young",
        age: 34
    },
    {
        id: 14, 
        name: "Mane",
        age: 21
    },
    {
        id: 15, 
        name: "Salah",
        age: 24
    }
];

players.reduce((_, val, index, arr) => {
    delete arr[index];
    arr[val.id] = val;
    return arr;
})

players[players[0].id] = players[0];
delete players[0];

console.log(players);



