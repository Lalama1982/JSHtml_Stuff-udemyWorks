// control structures : if/else
var name = 'John';
var age = 26;
var isMarried = 'no';

if (isMarried === 'yes') {
    console.log(name + ' is married');
} else {
    console.log(name + ' will marry soon');
}

isMarried = false; // turned to boolean
if (isMarried) {
    console.log('YES!');
} else {
    console.log('NO!');
}

// "==" vs "==="
if (23 == "23"){
    console.log('20=="23" >> type cohesion');
}

if (23 === "23"){
    null;
}else{
    console.log('20==="23" >> not type cohesion but abs value');
}

// control structures : boolean
var age = 20;
if (age<20){
    console.log('John is a teenager');
} else if (age >= 20 && age < 30){
    console.log('John is a young man');
} else {
    console.log('John is a man');
}

// control structures : switch

var job = 'pilot';
job = prompt('What does John do?');

switch (job){
    case 'teacher':
        console.log('John teaches kids');
        break;
    case 'driver':
        console.log('John drives a cab');
        break;
    case 'cop':
        console.log('John prevents crime');
        break;
    default:
        console.log('John does is a ' + job);        
}














