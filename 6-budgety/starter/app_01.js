/* IIFI - Immediately Invoked Function Implementation as MODULES */
var budgetController = (function() {
    var x = 23;
    var add = function(a){
        return x+a;
    }
    
    return{
        publicTest: function(b){
            console.log(add(b));
            return add(b);
        }
    }
})();

/* 
above function behavior, when checked in console.
budgetController.x
>> undefined -- not visible to public

budgetController.add(5)
>> VM264:1 Uncaught TypeError: budgetController.add is not a function
       at <anonymous>:1:18
       
budgetController.publicTest(5)
>> app.js:9 28
>> undefined       
-- publicTest function is made public
*/

var UIController = (function() {
    
})();

/* to make link between above IIFIs, "budgetCtrl, UICtrl" are passed as arguments */
var controller = (function(budgetCtrl, UICtrl) {
    var z = budgetCtrl.publicTest(6);
    
    return {
        anotherPublic: function(){
            console.log(z);
        }
    }
    
})(budgetController, UIController);