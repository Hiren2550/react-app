//alt + shift + f for format
const lib = require("./lib.js");
const fs = require("fs");

const t1 = performance.now();

// const text = fs.readFile("A1.txt", "utf-8", (err, data) => {
//   console.log(data);
// });

const t2 = performance.now();
console.log(t2 - t1);
console.log(lib);
console.log(lib.Sum(23, 45));
console.log(lib.Diff(34, 4));
console.log(lib.Mul(3, 5));

let a=['india','Pakistan']

let joined =a.join('|');
console.log(joined)


let arr=['shah','hiren','naresh','rahul','raj']
Array.prototype.myJoin=function(seperator=','){

    let result='';
    for(let i=0;i<this.length;i++)
    {
        result +=this[i];
        if(i !== this.length-1)
        {
        result +=seperator
        }
        
    }
    return result;
}

let ex=arr.myJoin('-');
console.log(ex);