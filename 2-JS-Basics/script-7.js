// Arrays
var names = ['John', 'Mark', 'Jane'];

// another way of defining
var years = new Array(1990, 1992, 1997); 

// zero based
console.log(names[0]);
console.log(names[2]);

names[1] = 'Ben';
console.log(names);

var john = ['John', 'Smith', 1990, 'teacher', false];
console.log(john);


// adding an element to the end
john.push('blue');
console.log('After push >> ' + john);

// adding an element to begining
john.unshift('Mr.');
console.log('After unshift >> ' + john);

//remove last element
john.pop();
console.log('After pop >> ' + john);

// remove first element
john.shift();
console.log('After shift >> ' + john);

// inside the array at 2nd position
alert(john.indexOf('Smith'));

// search within the array
if (john.indexOf('designer') === -1) {
    console.log('John is not a designer');
}
