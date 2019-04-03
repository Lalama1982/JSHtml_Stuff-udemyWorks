// let and const - block scope variable definition

// in ES5
var name5 = 'Jane Smith';
var age5 = 23;
name5 = 'Jane Miller';
console.log(name5);

// in ES6
const name6 = 'Jane Smith';
let age6 = 23;
//name6 = 'Jane Miller';  // gives an error as constant value could not be changed
console.log(name6);

// ES5
function driveLicense5(passedTest){
	if (passedTest){
		var firstName = 'John';
		var yearOfBirth = 1990;

		//console.log(firstName + ', born in '+ yearOfBirth+' , is now officially allowed to drive.');
	}
	console.log(firstName + ', born in '+ yearOfBirth+' , is now officially allowed to drive.');
}

driveLicense5(true);

// ES6
function driveLicense6(passedTest){
	if (passedTest){
		let firstName = 'John';
		const yearOfBirth = 1990;
	
		console.log(firstName + ', born in '+ yearOfBirth+' , is now officially allowed to drive. [block scope variable definition]');
	}
	// console.log(firstName + ', born in '+ yearOfBirth+' , is now officially allowed to drive.'); // error out as, variables are defined within "if" block scope
}	

driveLicense6(true);

function driveLicense6_1(passedTest){
	console.log('varVariable: '+varVariable);
	//console.log('letVariable: '+letVariable); //error out until, actual definition of the variable

	var varVariable;
	let letVariable;

	let firstName;
	const yearOfBirth = 1990;

	if (passedTest){
		firstName = 'John';
		//yearOfBirth = 1990;
	
		console.log(firstName + ', born in '+ yearOfBirth+' , is now officially allowed to drive. [let variable definition, yet before the "if"]');
	}
	//console.log(firstName + ', born in '+ yearOfBirth+' , is now officially allowed to drive.');
}	

driveLicense6_1(true);

console.log();
console.log();
console.log();

// demo of block scope variables
console.log('"let" defined variables are not overidden');
let i = 23;

for (let i = 0; i< 5; i++){
	console.log(i);
};

console.log(i); // does not refer to one within the loop

console.log();
console.log('"var" defined variables are overidden');
var j = 23;

for (var j = 0; j < 5; j++){
	console.log(j);
};

console.log(j); // does not refer to one within the loop

console.log();
console.log();
// Blocks & IIFEs
console.log('Blocks & IIFEs');

// defining a block
{
	const a = 1;
	let b = 2;
	var c = 3;
}

//console.log(a+b); //error out as as let declarations within the block are not visible
console.log(c); //variables within the block are visible

// let declaration in block is similar to IIFE under ES5
(function() {
	var d = 4;
}) ();
// cannot access the variable "d"

console.log();
console.log();
// Strings
console.log('Strings');

let firstName = 'John';
let lastName = 'Smith';
const yearOfBirth = 1990;

function calcAge(year) {
	return 2019-year;

}

// ES5
console.log('This is '+ firstName + ' '+ lastName+'. He was born in '+ yearOfBirth+'. Today he is '+calcAge(yearOfBirth)+ ' years old.');

// ES6 - use of template literals [back ticks]
console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}. Today he is ${calcAge(yearOfBirth)} years old.`);

console.log(`Name: ${firstName} ${lastName}`);
const n = `${firstName} ${lastName}`;
console.log(`startsWith("J"): ${n.startsWith("J")}`); // returns "true" or "false" on checking on the condition
console.log(`startsWith("j"): ${n.startsWith('j')}`); // case sensitive
console.log(`endsWith("sm"): ${n.endsWith('sm')}`);
console.log(`includes("oh"): ${n.includes('oh')}`);
console.log(`includes(" "): ${n.includes(' ')}`);
console.log(`${firstName} `.repeat(5)); // John John John John John
console.log(`${firstName}`.repeat(5)); // JohnJohnJohnJohnJohn

console.log();
console.log();
// Arrow functions
console.log('Arrow functions');
const years = [1990, 1965, 1982, 1937];

// ES5
var ages5 = years.map(function(el) {
	return 2016 - el;
});

console.log('ages5: '+ages5);

// ES6
const ages6 = years.map(el => 2016 - el);
console.log('ages6 (single argument): '+ages6);

let ages6_2 = years.map((el, index) => `Age element ${index +1}: ${2019-el}.`);
console.log('ages6_2 (multiple arguments): '+ages6_2);

let ages6_3 = years.map((el, index) => {
	const now = new Date().getFullYear();
	const age = now - el;
	return `Age element ${index+1}: ${age}.`;
});
console.log('ages6_3 (multiple arguement & return function): '+ages6_3);

// ES5
var box5 = {
	color: 'green',
	position: 1,
	clickMe: function(){
		// this.position or this.color, does not refere to object vars as this is a function call, not object call
		var self = this; // passing object reference to a function variable
		document.querySelector('.green').addEventListener('click', function(){
			var str = 'This is box number ' + self.position+ ' and it is '+self.color;
			alert(str);

		});
	},
	clickMeArrow: function(){
		document.querySelector('.green').addEventListener('click', () => {
			var str = 'This is box number ' + this.position+ ' and it is '+this.color;
			alert(str);

		});
	}
}

//box5.clickMe();
box5.clickMeArrow();

/*
var box5_1 = {
	color: 'green',
	position: 1,
	clickMe: () => {
		// this.position or this.color, does not refere to object vars as this is a function call, not object call
		var self = this; // passing object reference to a function variable
		document.querySelector('.green').addEventListener('click', function(){
			var str = 'This is box number ' + this.position+ ' and it is '+this.color;
			alert(str);

		});
	}
}
box5_1.clickMe();
*/

// above will show "this.position" & "this.color" as undefined as, "colorMe" function is already defined under "box5" hence reference look for global object "window"
// a concequence of using arrow functions

var friends = ['Bob','Jane','Mark'];

function Person(name){
	this.name = name;
}

Person.prototype.myFriends5 = function(friends) {
	var arr = friends.map(function(el){
		return this.name + ' is friends(x) with '+el;

	});

	console.log(arr);
}

Person.prototype.myFriends5_1 = function(friends) {
	var arr = friends.map(function(el){
		return this.name + ' is friends(y) with '+el;

	}.bind(this));

	console.log(arr);
}

new Person('John').myFriends5(friends); // could not refer to "this.name" as reference look for global object "window"
new Person('John').myFriends5_1(friends); // with binding it works

Person.prototype.myFriends6 = function(friends) {
	var arr = friends.map(el => `${this.name} is friends(z) with ${el}`);

	console.log(arr);
}

new Person('Mike').myFriends6(friends);

console.log();
console.log();
// Destructuring
console.log('Destructuring');

// ES5
var john = ['John', 26];
//var name = john[0];
//var age = john[1];

// ES6
const [name, year] = ['John',26];
console.log(name); // need to comment "var name" definition above
console.log(year); // need to comment "var age" definition above

const obj = {
	firstName2: 'John',
	lastName2: 'Smith'
};

const {firstName2, lastName2} = obj;
console.log('"firstName2" from "obj": '+firstName2);
console.log('"lastName2" from "obj": '+lastName2);

const {firstName2: a, lastName2: b} = obj;
console.log('"firstName2" from "obj" via alias: '+a);
console.log('"lastName2" from "obj" via alias: '+b);

function calcAgeRetirement(year){
	const age = new Date().getFullYear() - year;
	return[age, 65 - age];
}

const[age3, retirement] = calcAgeRetirement(1990);
console.log('Destructuring on function returns');
console.log('age3:'+age3);
console.log('retirement: '+retirement);


console.log();
console.log();
// Arrays
console.log('Arrays');

const boxes = document.querySelectorAll('.box');

// ES5

// below is commented to demo for loop charasterisitics
/*
var boxesArr5 = Array.prototype.slice.call(boxes);
boxesArr5.forEach(function(cur) {
	cur.style.backgroundColor = 'dodgerblue';
});
*/

// ES6
// alt#1
/*const boxesArr6 = Array.from(boxes);
boxesArr6.forEach(cur => cur.style.backgroundColor = 'dodgerblue');*/

//alt#2
//Array.from(boxes).forEach(cur => cur.style.backgroundColor = 'dodgerblue');

// ES5
var boxesArr5 = Array.prototype.slice.call(boxes);
for (var k = 0; k < boxesArr5.length; k++)
{
	if(boxesArr5[k].className === 'box blue') {
		continue;
		//break;
	}

	boxesArr5[k].textContent = 'Changed the value to blue';	
	boxesArr5[k].style.backgroundColor = 'dodgerblue';
}

// ES6
const boxesArr6 = Array.from(boxes);
for (const cur of boxesArr6) {
	/*if (cur.className === 'box orange') {
		continue;
	}*/
	//alternative to above if control structure
	if (cur.className.includes('box orange')) {
		continue;
	}

	cur.textContent = 'Changed the value to orangered';	
	cur.style.backgroundColor = 'orangered';

}

// loop an array find an item(s) on condition & return the array value
// ES5
var ages4 = [12,17,8,21,14,11];
var full = ages4.map(function(cur) {
	return cur >= 18;
});

console.log(full);
console.log(full.indexOf(true));
console.log(ages4[full.indexOf(true)]);

//ES6
console.log("Single line to find the index using Array & Arrow: "+ages4.findIndex(cur => cur >= 18));
console.log("Single line to find the value using Array & Arrow: "+ages4.find(cur => cur >= 18));
