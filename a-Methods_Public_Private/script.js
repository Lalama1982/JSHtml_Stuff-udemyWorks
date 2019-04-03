console.log('Hello Buddy');

var Module01 = (function() {
    var Valuestrings = ['Value_01','Value_02','Value_03'];
    console.log('Fired inside "Module01", before public methods');

	// defining as a private method    
	var getValuestringsPrivate = function(itemID){
		return Valuestrings[itemID];

	};

	// defining of public methods for "Module01"
	return{
        getValuestringsPublic: function(itemID) {
			return Valuestrings[itemID];

        },
        
        // access the private method "getValuestringsPrivate" and return the value
        getValuestringsFromPrivate: function(itemID) {
            var retValue = getValuestringsPrivate(1);
            return retValue;
            
        }
    };
})();

var Controller01 = (function(Module01Var) {
    var returnVal;
    console.log('Fired inside "Controller01", before public methods');
    
    returnVal = Module01Var.getValuestringsPublic(1);
    console.log("Returned Value (directly from Public Method): " + returnVal);

    returnVal = Module01Var.getValuestringsFromPrivate(1);
    console.log("Returned Value (from Private Method via Public Method): " + returnVal);
    
    var Valuestrings = ['Value_01','Value_02','Value_03'];
    returnVal = Valuestrings[1];
    console.log("Returned Value (Locally define): " + returnVal);
    
    // defining of public methods for "Controller01"
    return {
        init: function(){
            console.log('Fired inside "Controller01/init", inside the public method');
        }
    };      
    
})(Module01);    

// calling the public method on page call
Controller01.init();