// event listeners demostrations

// ES5
var box5 = {
	actionClick: 'clicked',
	position: 1,
	clickMe: function(){
		// this.position or this.color, does not refere to object vars as this is a function call, not object call
		var self = this; // passing object reference to a function variable
        var textOnTop = document.querySelector('.green').textContent;
		document.querySelector('.green').addEventListener('click', function(){
			//var str = 'This is green box number ' + self.position+ ' and it is '+self.actionClick;
            var str = 'This is green box ' + ' and it is '+self.actionClick+ ' and text on top is '+textOnTop;
			alert(str);

		});
	},
	clickMeById: function(){
		// this.position or this.color, does not refere to object vars as this is a function call, not object call
		var self = this; // passing object reference to a function variable
        var textOnTop = document.getElementById('id_orange').textContent;
		document.getElementById('id_orange').addEventListener('click', function(){
			//var str = 'This is green box number ' + self.position+ ' and it is '+self.actionClick;
            var str = 'This is orange box ' + ' and it is '+self.actionClick+ ' and text on top is '+textOnTop;
			alert(str);

		});
	},    
	clickMeArrow: function(){
        var textOnTop = document.querySelector('.blue').textContent;
		document.querySelector('.blue').addEventListener('click', () => {
			//var str = 'This is blue box number ' + this.position+ ' and it is '+this.actionClick;
            var str = 'This is blue box ' + ' and it is '+this.actionClick+ ' and text on top is '+textOnTop;
			alert(str);

		});
	}
}

box5.clickMe();
box5.clickMeById();
box5.clickMeArrow();