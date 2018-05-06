// Functions
// This is an functions statement
function calculateAge(yearOfBirth) {
    var age = 2018 - yearOfBirth;
    return age;
}

var ageJohn = calculateAge(1990);
var ageMike = calculateAge(1969);
console.log('John = ' + ageJohn + ' Mark = ' + ageMike);

// function within function
function yearsUntilRetriement(name, year) {
    var age = calculateAge(year);
    var retirement = 65 - age;
    
    if (retirement >= 0) {
        console.log(name + '\'s Retirement is ' + retirement);    
    } else {
        console.log(name + ' is already retired.');
    }
    
}

yearsUntilRetriement('John', 1990);

// function expression
var markRetirement = yearsUntilRetriement('Mark', 1960);


