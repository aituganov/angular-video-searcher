angular.module('Jenova').directive('jnvResultNo', function() {
	return {
		restrict: 'C',
		scope: {
			randomSearch: "="
		},
		templateUrl: 'directives/result/no/result-no.html'
	};
});