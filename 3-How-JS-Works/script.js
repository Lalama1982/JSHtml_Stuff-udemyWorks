///////////////////////////////////////
// Lecture: Hoisting

// hoising with functions
calculateAge(1999);
// consider the function declaration is called before the declaration
function calculateAge(year) {
    console.log(2018 - year);
}

/*
retirement(1956);
// function expression does not work for hoisting
var retirement = function(year) {
    console.log(65 - (2018 - year));
}
*/

// hoisting with variables
console.log('First >> ' + age); // variable will declared as undefined
var age = 23;

function foo() {
    console.log('Second >> ' + age);
    var age = 65;
    console.log('Third >> ' + age);
}

foo();
console.log('Fourth >> ' + age);

///////////////////////////////////////
// Lecture: Scoping

/*
// First scoping example
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}
*/

// Example to show the differece between execution stack and scope chain
console.log('');
console.log('Execution Stack vs Scope Chain');
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third();
    }
}

function third() {
    var d = 'John';
    console.log(a + d); // + b + c + d);
}

///////////////////////////////////////
// Lecture: The this keyword
console.log('');
console.log('Use of "This" key word');

console.log(this);

calculateAge2(1985);

function calculateAge2(year) {
    console.log(2018 - this);
    console.log(this);
}

var john = {
    name: 'John',
    yearOfBirth: 1990,
    calculcateAge3: function() {
        console.log(this);
        console.log(2018 - this.yearOfBirth);
        
        function innerFunc() {
            // here "this" object does not refer to "john" object but window it self
            console.log('Insider inner function >> ' + this);
        }
        innerFunc();
    }
}

john.calculcateAge3();


var mike = {
    name: 'Mike',
    yearOfBirth: 1984
};

// use of method borrowing
console.log('');
console.log('Method borrowing');
mike.calculcateAge3 = john.calculcateAge3;
// here, "this" of "calculateAge3" refers to object "mike"
mike.calculcateAge3();














