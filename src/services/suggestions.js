angular.module('Jenova').service('jnvSuggestions', ["jnvSearchResults", "$http", "$q", "$timeout", function(jnvSearchResults, $http, $q, $timeout){
	var limit = 10,
		limitBar = 20;

	var makeQueryUrlPart = function(query){
		return query && query.length ? 'query=' + query + '&' : '';
	};
	var makeSubstringUrlPart = function(string){
		return string && string.length ? 'substring=' + string + '&' : '';
	};

	return {
		suggest: (function () {
		var suggestion = {};
			return function(string, query, offset){
				offset = angular.isDefined(offset) ? offset : 0;
				jnvSearchResults.suggestions.noResults = false;
				jnvSearchResults.suggestions.loading = true;

				var delay = 300;
				$timeout.cancel(suggestion.timer);
				if (suggestion.canceler) {
					suggestion.canceler.resolve();
					suggestion.canceler = null;
				}
				suggestion.timer = $timeout(function () {
					suggestion.canceler =  $q.defer();
					$http.get('/api/search/suggestions?' + makeQueryUrlPart(query) + makeSubstringUrlPart(string) + 'limit=' + limit + '&offset=' + offset).
						success(function(data, status, headers, config) {
							jnvSearchResults.suggestions.data = [];
							jnvSearchResults.suggestions.error = false;

							if (data.length){
								Array.prototype.push.apply(jnvSearchResults.suggestions.data, data);
								jnvSearchResults.suggestions.noResults = false;
							} else {
								jnvSearchResults.suggestions.noResults = true;
							}

							jnvSearchResults.suggestions.hasMore = data.length === limit;
							jnvSearchResults.suggestions.loading = false;
						}).
						error(function(data, status, headers, config) {
							console.error("SEARCH ERR", data, status, headers);
							jnvSearchResults.suggestions.loading = false;
							jnvSearchResults.suggestions.error = true;
						});
				}, delay);
			};
		}()),
		suggestBar: function(suggestionsQuery, offset){
			offset = angular.isDefined(offset) ? offset : 0;
			if (!offset){
				jnvSearchResults.suggestionsBlock.data = []; //new suggestions
			}
			jnvSearchResults.suggestionsBlock.noResults = false;
			jnvSearchResults.suggestionsBlock.loading = true;

			$http.get('/api/search/suggestions?' + makeQueryUrlPart(suggestionsQuery) + 'limit=' + limitBar + '&offset=' + offset).
				success(function(data, status, headers, config) {
					jnvSearchResults.suggestionsBlock.error = false;

					if (data.length){
						Array.prototype.push.apply(jnvSearchResults.suggestionsBlock.data, data);
						jnvSearchResults.suggestionsBlock.noResults = false;
					} else {
						jnvSearchResults.suggestionsBlock.noResults = true;
					}

					jnvSearchResults.suggestionsBlock.hasMore = data.length === limitBar;
					jnvSearchResults.suggestionsBlock.loading = false;
				}).
				error(function(data, status, headers, config) {
					console.error("SEARCH ERR", data, status, headers);
					jnvSearchResults.suggestionsBlock.loading = false;
					jnvSearchResults.suggestionsBlock.error = true;
				});
		}
	};
}]);

