// Objects, key value pairs
var john = {
    name: 'John',
    lastName: 'Smith',
    yearOfBirth: 1990,
    job: 'teacher',
    isMarried: false
};

console.log(john);

console.log('lastName : ' + john.lastName);
console.log('lastName : ' + john['lastName']);

var xyz = 'job';
console.log('Job : ' + john[xyz]);

// Manipulations
john.lastName = 'Miller';
john['job'] = 'programmer';
console.log(john); // cannot concatenate

// defining another different way
var jane = new Object();
jane.name = 'Jane';
jane.lastName = 'Smith';
jane['yearOfBirth'] = 1969;
jane['job'] = 'retired';
jane['isMarried'] = true;

console.log(jane);
