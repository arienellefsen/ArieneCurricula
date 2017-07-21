
var concatNames = function(names) {
	
	var returnVal = '';

	for(var i = 0; i < names.length; i++) {
		returnVal += names[i];
		if(i++ < names.length) returnVal += ' + ';

	}
};

var inputArray = ['Mike','Ariene','Mark'];

concatNames(inputArray);
