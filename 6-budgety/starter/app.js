/* IIFI - Immediately Invoked Function Implementation as MODULES // Check app_01.js for IIFI defined training */
// Budget Controller
var budgetController = (function() {
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
		this.percentage = -1;
    };
    
	Expense.prototype.calcPercentage = function(totalIncome){
		if (totalIncome > 0) {
			this.percentage = Math.round((this.value / totalIncome)*100);
		} else{
			this.percentage = -1;
		};		
	};

	Expense.prototype.getPercentage = function() {
		return this.percentage;

	};

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
	var calculateTotal = function(type) { // type 'inc / exp'
		var sum = 0;
		data.allItems[type].forEach(function(cur){
			sum = sum + cur.value;

		});

		data.totals[type] = sum;
	};

    var allExpenses = [];
    var allIncomes = [];
    var totalExpenses = [];
    
    var data = {
        allItems: {
            exp: [],
            inc: []
            
        },        
		totals: {
            exp: 0,
            inc: 0
        },
		budget: 0,
		percentage: -1
    };

	return{
		addItem: function(type, des, val){
			var newItem, ID;

			if (data.allItems[type].length > 0) {
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			} else {
				ID = 0;
			};
			

			if (type === 'exp'){
				newItem = new Expense(ID, des, val);
			} else if (type == 'inc'){
				newItem = new Income(ID, des, val);
			};

			// Here values for "type" {inc or exp), matches to the names given to the arrays of "allItems" object
			// push the object to the "allItems" array
			data.allItems[type].push(newItem);

			return newItem;
		},

		deleteItem: function(type, id) {
			// necessary find the index of the "data" array to remove the record
			// below returns an array
			var ids =	data.allItems[type].map(function(current){
							return current.id;
						});

			index = ids.indexOf(id);
			
			if(index !== -1){
				data.allItems[type].splice(index, 1);
			};

		},

		calculateBudget: function() {
			// calculate total income & expenses
			calculateTotal('exp');
			calculateTotal('inc');

			// calculate the budget = income - expenses
			data.budget = data.totals.inc - data.totals.exp;

			// calculate the percentage of income that we spent
			if (data.totals.inc > 0) {
				data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
			} else {
				data.percentage = -1;
			};
			

		},

		calculatePercentages: function() {
			data.allItems.exp.forEach(function(cur){
				cur.calcPercentage(data.totals.inc);
			
			});

		},

		getPercentages: function() {
			var allPerc = data.allItems.exp.map(function(cur) {
				return cur.getPercentage();
			
			});

			return allPerc;

		},

		getBudget: function() {
			return {
				budget: data.budget,
				totalInc: data.totals.inc,
				totalExp: data.totals.exp,
			    percentage: data.percentage
			}	

		},

		testing: function() {
			console.log(data);
		}

	};

})();

// UI Controller
// Returns with an object with properties assigned with I/P valuea
var UIController = (function() {
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputAddbtn: '.add__btn',
		incomeContainer: '.income__list',
		expenseContainer: '.expenses__title',
		budgetLable: '.budget__value',
		incomeLable: '.budget__income--value',
		expensesLable: '.budget__expenses--value',
		percentageLabel: '.budget__expenses--percentage',
		container: '.container',
		expensesPercLable: '.item__percentage',
		dateLable: '.budget__title--month'
    };

	Object.prototype.isEmpty = function() {
		for(var key in this) {
			if(this.hasOwnProperty(key))
				return false;
		}
		return true;
	};

	// defining as a private method    
	var formatNumber = function(num,type){
		// + or - & 2 decimals & comma seperating thousands
		var numSplit, int, dec;

		num = Math.abs(num);
		num = num.toFixed(2); // "toFixed" is a prototype of Number object, round to 2

		numSplit = num.split('.');
		int = numSplit[0];

		if (int.length > 3){
			int = int.substr(0,int.length-3)+','+int.substr(int.length-3,3)
		};

		dec = numSplit[1];

		return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;

	};

	var nodeListForEach = function(list, callback){
		for(var i=0; i < list.length; i++){
			callback(list[i], i);

		};
	};
    // In this way (with return) when the functions (inside) can be called publically (via an object of "UIController")
	// defining as public methods
    return{
        getinput: function(){
            /*return{
                type: document.querySelector('.add__type').value, // select element of +/- and getting selected option (inc or exp)
                description: document.querySelector('.add__description').value,
                value: document.querySelector('.add__value').value

            };*/
            //instead of hardcoding the class name, an object is defined "DOMstrings" to return the class name, when called
            return{
                type: document.querySelector(DOMstrings.inputType).value, // select element of +/- and getting selected option (inc or exp)
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)

            };            
        },

		addListItem: function(obj, type) {
			var html, newHtml, element;
			
			if (obj.description != "" && obj.value != "") {
				// create HTML string with placeholder text
				if (type === 'inc'){
					element = DOMstrings.incomeContainer;
					html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
				} else if (type === 'exp') {
					element = DOMstrings.expenseContainer;
					html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
				};

				// replace the placeholder text with some sctual data
				newHtml = html.replace('%id%',obj.id);
				newHtml = newHtml.replace('%description%',obj.description);
				newHtml = newHtml.replace('%value%',formatNumber(obj.value, type));			
			
				// insert HTML into the DOM
				document.querySelector(element).insertAdjacentHTML('beforeend',newHtml); // this is an HTML function to append existing html code			
			} else {
				console.log('Null selected to add');
			};

		},

		deleteListItem: function(selectorID) {
			var el = document.getElementById(selectorID);
			el.parentNode.removeChild(el);
			//document.getElementById(selectorID).parentNode.removeChild(document.getElementById(selectorID));
		},

		clearFields: function() {
			var fields, fieldsArr;

			// Below will capture all the DOM values using single command
			fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue); // this returns a list

			fieldsArr = Array.prototype.slice.call(fields); // converting to an array

			fieldsArr.forEach(function (current, index, array) {
				current.value = "";
				
			});

			fieldsArr[0].focus();
		},

		displayBudget: function(obj){
			var type;
			obj.budget > 0 ? type = 'inc' : type = 'exp';
			
			document.querySelector(DOMstrings.budgetLable).textContent = formatNumber(obj.budget,type);
			document.querySelector(DOMstrings.incomeLable).textContent = formatNumber(obj.totalInc, 'inc');
			document.querySelector(DOMstrings.expensesLable).textContent = formatNumber(obj.totalExp,'exp');
			document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage;

			if (obj.percentage > 0){
				document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage+'%';
			} else {
				document.querySelector(DOMstrings.percentageLabel).textContent = '----';
			}
			;

		},

		displayPercentages: function(percentages) {		
			var fields = document.querySelectorAll(DOMstrings.expensesPercLable); // returns a node list

			// call back function
			nodeListForEach(fields, function(current, index) {
				if (percentages[index] > 0){ 
					current.textContent = percentages[index] + '%';
				} else {
					current.textContent = '---';
				};				
			
			});

		},

		displayMonth: function() {
			var now, year, month, months;

			now = new Date();
			var spldate = new Date(2018,11,23);

			months = ['Jan', 'Feb', 'Mar', 'Apr'];
			month = now.getMonth();
			year = now.getFullYear();
			document.querySelector(DOMstrings.dateLable).textContent = months[month-1]+ ' '+ year;

		},

		changedType: function() {
			var fields = document.querySelectorAll(
				DOMstrings.inputType + ',' +
				DOMstrings.inputDescription + ',' +
				DOMstrings.inputValue);

			nodeListForEach(fields, function(cur) {
				cur.classList.toggle('red-focus'); // "red-focus" is a class in the "css" file, "toggle" is better than "add"
			});

			document.querySelector(DOMstrings.inputAddbtn).classList.toggle('red');

		},

        // to make DOMstrings public to other functions
        getDOMstrings: function() {
            return DOMstrings;
        }
    };

    
})();


/* to make link between above IIFIs, "budgetCtrl, UICtrl" are passed as arguments */
var controller = (function(budgetCtrl, UICtrl) {
    
    var setupEventListeners = function() {
        // placing the below functions inside another pvt function, make them un-executable, hence need the "init" function to call them
        // .. as soon as the "js" is accessed
        var DOM = UICtrl.getDOMstrings(); // creating the function var for DOM public function
        
        document.querySelector(DOM.inputAddbtn).addEventListener('click', ctrlAddItem);

        // event on press any key
        document.addEventListener('keypress', function(Event) {

            //console.log(event);
            // on press of any key, shows this; KeyboardEvent {isTrusted: true, key: "Enter", code: "Enter", location: 0, ctrlKey: false, …}
            // "keyCode" value is important in identifying the actual key been pressed


            // Identigy the Enter key and "Event.which" is for older browsers
            if(Event.keyCode === 13 || Event.which === 13) {
                //console.log('Enter is pressed');
                ctrlAddItem();

            }

        });   
		
		document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem);

		// changing clours based on exp and inc, when the "Type" is changed in the html page, this will listen
		document.querySelector(DOM.inputType).addEventListener('change',UICtrl.changedType);

    };    
    
	var updateBudget = function() {
		// 1. Calculate the budger
		budgetCtrl.calculateBudget();

		// 2. Return the Budget
		var budget = budgetCtrl.getBudget();

		// 3. Display the budget in UI
		//console.log(budget);
		UICtrl.displayBudget(budget);

	};

	var updatePercentages = function() {
		// 1) Calculate percentages
		budgetCtrl.calculatePercentages();

		// 2) Read percentages from the budget Controller
		var percentages = budgetCtrl.getPercentages();

		// 3) Update the UI with the new percentages
		console.log(percentages);
		UICtrl.displayPercentages(percentages);
	};


    var ctrlAddItem = function() {
        // for testing: console.log('Button Clicked');
		var input, newItem;

        // 1) Get the filled input data
        input = UICtrl.getinput();
        console.log(input);

		if (input.description !== "" && !isNaN(input.value) && input.value != 0) {
			// 2) Add the item to the budget controller
			newItem = budgetCtrl.addItem(input.type, input.description, input.value);

			// 3) Add the item to the UI
			UICtrl.addListItem(newItem, input.type);

			// 4) Clear the fields
			UICtrl.clearFields();
		
			// 5) Calculate & update budget
			updateBudget(); //local function in the "Controller"	
			
			// 6) Calculate & update percentages
			updatePercentages();
			
		};

        //console.log('AAA');        
        
    };
    
	var ctrlDeleteItem = function(event) {
		var itemID, splitID, type, ID;

		itemID = event.target.parentNode.parentNode.parentNode.id; // DOM traversing, moving upto the parent node and applying of multiple parentNodes to reach at "div class="item clearfix" "
		// ID is the value planted via "addListItem" function

		if (itemID) {
			splitID = itemID.split('-'); // returns an array, eg. "inc-1" >> ["inc", "1"]
			type = splitID[0];
			ID = parseInt(splitID[1]);

			// 1) Delete the item from the data structure
			budgetCtrl.deleteItem(type, ID);

			// 2) Delete the item from UI
			UICtrl.deleteListItem(itemID);

			// 3) Update & show the new budget
			updateBudget(); //local function in the "Controller"	

			// 4) Calculate & update percentages
			updatePercentages();

		}																					

	};

    /* all below is moved to "setupEventListeners" function above to maintain event listeners in one place
    var DOM = UICtrl.getDOMstrings(); // creating the function var for DOM public function
    
    document.querySelector(DOM.inputAddbtn).addEventListener('click', ctrlAddItem);
    
    // event on press any key
    document.addEventListener('keypress', function(Event) {
        
        //console.log(event);
        // on press of any key, shows this; KeyboardEvent {isTrusted: true, key: "Enter", code: "Enter", location: 0, ctrlKey: false, …}
        // "keyCode" value is important in identifying the actual key been pressed
        
        
        // Identigy the Enter key and "Event.which" is for older browsers
        if(Event.keyCode === 13 || Event.which === 13) {
            //console.log('Enter is pressed');
            ctrlAddItem();
            
        }                
        
    });
    */
    return {
        init: function(){
            console.log('Application Started');
			UICtrl.displayMonth();
			// setting null/zero at the initiation of the Application, check the null/zero valued object, within the parameters of displayBudget
			UICtrl.displayBudget( {
				budget: 0,
				totalInc: 0,
				totalExp: 0,
			    percentage: -1
			});
            setupEventListeners();
        }
    };    
    
})(budgetController, UIController);

controller.init();