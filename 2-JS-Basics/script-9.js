// Objects and methods
var john = {
    // declaring properties
    name: 'John',
    lastName: 'Smith',
    yearOfBirth: 1990,
    job: 'teacher',
    isMarried: false,
    family: ['Jane', 'Mark', 'Bob'],
    // method declaration
    calculateAge: function(yearOfBirth) {
        return 2018 - yearOfBirth;
    },
    // uses, object property instead of param
    calculateAge2: function () {
        return 2018 - this.yearOfBirth;
    }    
};

console.log(john);
console.log(john.family);
console.log(john.family[2]);
console.log(john.calculateAge(1998));
// use of object element
console.log(john.calculateAge2());

var age = john.calculateAge2();
john.age = age;

console.log(john);

// set value to a property within the object declaration
var jane = {
    name: 'Jane',
    lastName: 'Wright',
    yearOfBirth: 1982,
    job: 'designer',
    isMarried: true,
    family: ['Jane', 'Mark', 'Bob'],
    // uses, object element instead of param
    calculateAge: function(){
        this.age = 2018 - this.yearOfBirth;
    }    
};

jane.calculateAge();
console.log(jane);