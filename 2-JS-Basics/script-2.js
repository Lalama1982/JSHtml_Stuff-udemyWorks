// variables
var name = "John";
console.log(name);

var lastName = 'Smith';
console.log(lastName);

var age = 26;
console.log(age);

var fullAge = true;
console.log(fullAge);

var name = 'John';
var age = 26;

//Type cohesion; converts some data type on flyer
console.log(name+age);
console.log(age+age);

//undefined variables
var job, isMarried;

console.log(job); // should show "undefined"

job = 'teacher';
isMarried = false;
console.log(name +' is a '+ age +' years old '+ job + '. Is he married? '+ isMarried);

// variable mutation
age = 'thirty six';
job = 'driver';
console.log(name +' is a '+ age +' years old '+ job + '. Is he married? '+ isMarried);

// getting values from console
var lastName = prompt('What is the last name ?');
console.log('Last name is '+lastName);

// popup window
alert(name +' ' +lastName+' is a '+ age +' years old '+ job + '. Is he married? '+ isMarried);