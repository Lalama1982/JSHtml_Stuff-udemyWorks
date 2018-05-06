// coding challenge #2
function printFullAge(years){
    var ages = [];
    var fullAges = [];
    
    for( var i = 0; i < years.length; i++ ) {
        ages[i] = 2018 - years[i];
    }

    for ( var i = 0; i < ages.length; i++ ) {    
        if (ages[i] >= 18){
            console.log('Person ' + (i + 1) + ' is ' + ages[i] + ' years old and of full age.'); 
            fullAges.push(true);
            
        } else {
            console.log('Person ' + (i + 1) + ' is ' + ages[i] + ' years old and not full of age');
            fullAges.push(false);
        }

    }
    
    return fullAges;
}

var years = [1990, 1992, 1997, 1998, 2000, 2013]; 

var full_1 = printFullAge(years);
console.log('');
console.log('Second array');
var full_2 = printFullAge([2012, 1972, 2001, 1887]);

