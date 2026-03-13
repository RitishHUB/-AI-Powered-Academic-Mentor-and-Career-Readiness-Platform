

// let a = "apple orange banana";

// let rev = a.split("").reverse().join("");

// console.log(rev);



// function palindrome(str) {
//     srt = str.replace(/\s+/g, '').toLowerCase();
//     let rev = str.split(" ").reverse().join("");

//     if( str===rev) {
        
//     console.log(rev);
//     return true;
// }
// }
// console.log(palindrome("Apple"));




let num = parseInt(prompt("Enter a number: "));


let result = ["Even", "Odd"];


console.log(`The number is ${result[num % 2]}`);
