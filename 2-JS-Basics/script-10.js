// looping ad iterations
for (var i = 0; i < 10; i++) {
    console.log(i);
} 


var names = ['John', 'Jane', 'Mary', 'Mark', 'Bob'];
for (var i = 0; i < names.length; i++) {
    console.log(names[i]);
}

console.log('');

for (var i = names.length - 1; i >= 0; i--) {
    console.log(names[i]);
}

console.log('');
console.log('WHILE LOOP');
var j = 0;
while(j < names.length) {
    console.log(names[j]);
    j++;
}

console.log('');
console.log('BREAK');

for (var k = 1; k <= 5; k++) {
    console.log(k);
    
    if (k == 3) {
        break;
        
    }
}

console.log('');
console.log('CONTINUE');

for (var k = 1; k <= 5; k++) {    
    if (k == 3) {
        continue;
        
    }
    // at k == 3, it will skip succeeding statements and just increment
    console.log(k);
}
