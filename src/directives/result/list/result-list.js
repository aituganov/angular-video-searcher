angular.module('Jenova').directive('jnvResultList', ['jnvSearch', 'jnvSearchResults', function(jnvSearch, jnvSearchResults) {
	return {
		restrict: 'C',
		scope: {
			randomSearch: "="
		},
		templateUrl: 'directives/result/list/result-list.html',
		link: function(scope) {
			scope.results = jnvSearchResults.search;

			scope.scrollIsDisabled = function(){
				return scope.results.loading || !scope.results.hasMore || scope.results.error;
			};

			scope.getNextResults = function(){
				jnvSearch.getNextResultPortion();
			};
		}
	};
}]);