angular.module('Jenova').directive('jnvApplication', ['jnvSearch', 'jnvSuggestions', 'jnvSearchResults', '$location', function(jnvSearch, jnvSuggestions, jnvSearchResults, $location) {
	return {
		restrict: 'C',
		templateUrl: 'directives/application/application.html',
		scope: {},
		link: function(scope){
			var search = function(){
				var q = $location.search() && $location.search().q;

				if (scope.query !== q) scope.query = q; //initial search

				if (q && q.length){
					jnvSearch.search(q);
					jnvSuggestions.suggestBar(q);
				} else {
					jnvSearch.randomSearch();
					jnvSuggestions.suggestBar();
				}
			};

			scope.results = jnvSearchResults;

			scope.clearQuery = function(){
				$location.search('q', null);
			};

			//get criteries from initial path
			search();

			scope.$on('$locationChangeSuccess', function(){
				search();
			});
		}
	};
}]);