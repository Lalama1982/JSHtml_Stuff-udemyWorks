// Function construction
var john = {
    name: 'John',
    yearOfBirth: 1990,
    job: 'teacher'
};

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
Person.prototype.lastName = 'Smith';

// instantiation
// "new" > a new, empty object is created, asigned to variable
var john = new Person('John', 1990, 'teacher');
john.calculateAge();

var jane = new Person('Jane', 1969, 'designer');
jane.calculateAge();

