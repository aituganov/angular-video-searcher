angular.module('Jenova').filter('timeConverter', function(){
	return function(value){
		if (!value) return '';

		seconds = parseInt(value, 10);
		// multiply by 1000 because Date() requires miliseconds
		var date = new Date(seconds * 1000);
		var hh = date.getUTCHours();
		var mm = date.getUTCMinutes();
		var ss = date.getSeconds();
		// If you were building a timestamp instead of a duration, you would uncomment the following line to get 12-hour (not 24) time
		// if (hh > 12) {hh = hh % 12;}
		// These lines ensure you have two-digits
		if (hh < 10 && hh !== 0) {hh = "0"+hh;} else if (hh === 0) {hh = "";}
		if (mm < 10 && mm !== 0) {mm = "0"+mm;}
		if (ss < 10) {ss = "0"+ss;}

		// This formats your string to HH:MM:SS
		return (hh ? hh + ":" : hh) + mm + ":" + ss;
	};
});