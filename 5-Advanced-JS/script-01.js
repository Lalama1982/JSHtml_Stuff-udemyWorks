// Function construction
/*var john = {
    name: 'John',
    yearOfBirth: 1990,
    job: 'teacher'
};*/

console.log("1> Object and prototyping")
var Person = function (name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
    /*
    // instead of defining here, seperatly under prototype function could define
    this.calculateAge = function () {
        console.log(2018 - this.yearOfBirth);
    };*/
};

// each time, object initialized, this will not get executed
// hence only when referred
Person.prototype.calculateAge = function() {
    console.log(2018 - this.yearOfBirth);
};

// This will be referred as part of object
//Person.prototype.lastName = 'Smith';

// instantiation
// "new" > a new, empty object is created, asigned to variable
var john = new Person('John', 1990, 'teacher');
john.calculateAge();

var jane = new Person('Jane', 1969, 'designer');
jane.calculateAge();

// This will be referred as part of object
Person.prototype.lastName = 'Smith';
// check the "lastName" attribute inherited from "Person" prototype to individual objects
console.log(john.lastName);
console.log(jane.lastName);


//Object.create
console.log('2> Demonstrating object creation');

var personProto = {
    calculateAge: function() {
        console.log(2018- this.yearOfBirth);
    }
};

var leah = Object.create(personProto);
leah.name = 'Leah';
leah.yearOfBirth = 1982;
leah.job = 'Manager';

var erica = Object.create(personProto, 
            {
                name: { value: 'Erica'},
                yearOfBirth: { value: 1986},
                job: {value: 'Admin'}
    
});
// check the objects created via the console.

// primitives VS objects
console.log('3> primitives VS objects');
var a = 23;
var b = a;
a = 46;
console.log(a);
console.log(b);
// a and b are two distinct variables

var obj1 = {
    name: 'John',
    age: 26
};
var obj2 = obj1;
obj1.age = 32;
console.log(obj1.age);
console.log(obj2.age);
// obj1 and obj2 are referring to same object hence shows the same value

// Functions
console.log("4> functions")
var age = 55;
var obj = {
    a: 33,
    city: 'Melbourne'
};

function change(a,b){
    a = 18;
    b.city = "Colombo";
}

change(age, obj);
console.log(age);
console.log(obj.city);
// here passing the primitive is a mere copy of the value
// but the object passes a reference the original, thus updated the same object

// Functions as arguments
console.log("5> Functions as arguments")
var years = [1990, 1995, 1937, 2005, 1998];

function arrayCalc(arr, fn){
    var arrRes = [];
    for (var i=0; i<arr.length; i++){
        arrRes.push(fn(arr[i]));        
    }
    return arrRes;
}

function calcAge(el){
    return 2018 - el;    
}

function isFullAge(el){
    return el >= 18;
}

function maxHeartRate(el){
    if (el >= 18 && el <= 81){
        return Math.round(206.9-(0.67*el));
    } else{
        return -1;
    }
}

// passing the "calcAge" fn as an argument
var ages = arrayCalc(years,calcAge);

// passing the "isFullAge" fn as an argument
var fullAges = arrayCalc(ages, isFullAge);

// passing the "maxHeartRate" fn as an argument
var rates = arrayCalc(ages, maxHeartRate);

//console.log("Calculated Ages> "+ages);
console.log("Full Age comparison> "+fullAges);
console.log("Hear Rate> "+rates);

// Functions as arguments
console.log("6> Functions returning functions");
function interviewQuestions(job){
    if (job == 'designer'){
        return function(name){
            console.log(name + ', Please explain UX concepts?');
        }
    }else if (job == 'teacher'){
        return function(name){
            console.log(name + ', What subjects you teach?')
        }
    }else {
        return function(name){
            console.log(name + ', What do you do?');
        }
    }
}

// Here, "teacherQuestion" is the return function object
var teacherQuestion = interviewQuestions('teacher');
teacherQuestion('John');

var designerQuestion = interviewQuestions('designer');
designerQuestion('Mark');

interviewQuestions('teacher')('Samuel');

var programmerQuestion = interviewQuestions('programmer');
programmerQuestion('Dick');  

// Immediately invoked Function Expressions
console.log("7> IIFE");
// Normal, called to variable
(function(){
    var score = Math.random() * 10;
    console.log(score >= 5);
})();
// cannot access the variable
(function(goodluck){
    var score = Math.random() * 10;
    console.log(score >= 5 - goodluck);
})(5);

// Closures
console.log("8> Closures");

function retirement(retirementAge){
    var a = ' years left until retirement.';
    return function(yearOfBirth){
        var age = 2018 - yearOfBirth;
        console.log((retirementAge-age)+a);
    }
}

var retirementUS = retirement(66);
retirementUS(1990);

retirement(66)(1982);
// inner function still have the access to var "a" of outer function
// 3 different setups, same function
function interviewQuestion(job){
    return function(name){
        if (job == 'designer'){
            console.log(name + ', Please explain UX concepts?');
        }else if (job == 'teacher'){
                console.log(name + ', What subjects you teach?')
        }else {
            console.log(name + ', What do you do?');
        }        
    }
}

interviewQuestion('teacher')('John');
interviewQuestion('designer')('Mark');
interviewQuestion('programmer')('Dick');  



// Bind, Call and Apply
console.log("9> Bind, Call and Apply");
var john = {
    name: 'John',
    age: 26,
    job: 'teacher',
    presentation: function(style, timeOfDay){
        if (style === 'formal') {
            console.log('Good '+timeOfDay+', People! I\'m '+this.name+', I\'m a '+this.job+', I\'m '+this.age+' years old.');            
        }else if(style === 'friendly'){
            console.log('Hey whats\'s up People! I\'m '+this.name+', I\'m a '+this.job+', I\'m '+this.age+' years old. Have a nice '+timeOfDay+'.');             
        }
    }
}


var emily = {
    name: 'Emily',
    age: 35,
    job: 'designer'
};

// std calling
john.presentation('formal', 'morning');

// method borrowing, methods of "john" used for "emily"
john.presentation.call(emily,'friendly','afternoon');


//binding
var johnFriendly = john.presentation.bind(john, 'friendly');
// part of the input arguments are set afterwards
johnFriendly('morning');
johnFriendly('night');

// binding + method borrowing
var emilyFormal = john.presentation.bind(emily, 'formal');
emilyFormal('afternoon');

function arrayCalcN(arr, fn){
    var arrRes = [];
    for (var i=0; i<arr.length; i++){
        arrRes.push(fn(arr[i]));        
    }
    return arrRes;
}

function calcAgeN(el){
    return 2018 - el;    
}

function isFullAgeN(limit, el){
    return el >= limit;
}


var ages2 = arrayCalcN(years, calcAgeN);
var fullJapan = arrayCalcN(ages2, isFullAgeN.bind(this,20));
// above, cannot pass 2 arguments even "isFullAgeN" require so
// hence, partially bind the "limit" variable and other set by at the loop of "arrayCalcN"

console.log(ages2);
console.log(fullJapan);
