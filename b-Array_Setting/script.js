console.log('Hello Buddy');

// Function/Method holding the array
var methodHoldingArray = (function() {
    console.log('At top of "methodHoldingArray"');

    var data = {
		item01: 'value01',
		item02: 'value02',
		item03: ''
    };
	
	return{
		settingValueToArray: function() {	
            console.log('Inside "settingValueToArray"');
			data.item03 =	'Value set externally';
		},

		retrievingValueFromArray: function() {
            console.log('Inside "retrievingValueFromArray"');
			return {
				retitem01: data.item01,
				retitem02: data.item02,
				retitem03: data.item03
			};	

		},
        
		retrievingSpecValueFromArray: function(itemCode) {
            console.log('Inside "retrievingSpecValueFromArray"');
			return data[itemCode];

		}        
		
	};	
	
})();	

var controller = (function(methHoldCtlr) {
    console.log('Inside top of "controller"');
    
	var callMethods = function() {
        console.log('Inside "callMethods"');
		methHoldCtlr.settingValueToArray();

		var arrayValues = methHoldCtlr.retrievingValueFromArray();
        console.log("1st Value : "+arrayValues.retitem01);
        console.log("2nd Value : "+arrayValues.retitem02);
        console.log("3rd Value : "+arrayValues.retitem03);
        
        var specArrayValue = methHoldCtlr.retrievingSpecValueFromArray('item01');
        console.log('Set item value of "item01" : '+specArrayValue);

	};
	
    return {
        init: function(){
            console.log('Application Started');
            console.log('Inside "init"');
            callMethods();
        }
    };    
    
})(methodHoldingArray);	


console.log('Before calling the "init" externally');
controller.init();