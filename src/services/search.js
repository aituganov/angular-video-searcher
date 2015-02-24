angular.module('Jenova').service('jnvSearch', ["jnvSearchResults", "$http", function(jnvSearchResults, $http){
	var limit = 16,
		url = "";

	return {
		search: function(searchQuery){
			var queryParam = searchQuery ? 'query=' + searchQuery + '&' : '';

			jnvSearchResults.search.data = [];
			url = '/api/search/results?' + queryParam;

			this.getNextResultPortion();
		},
		randomSearch: function(){
			jnvSearchResults.search.data = [];
			url = '/api/search/random?';

			this.getNextResultPortion();
		},
		getNextResultPortion: function(){
			jnvSearchResults.search.loading = true;
			jnvSearchResults.search.error = false;

			$http.get(url + 'limit=' + limit + '&offset=' + jnvSearchResults.search.data.length).
				success(function(data, status, headers, config) {
					if (data.length){
						Array.prototype.push.apply(jnvSearchResults.search.data, data);
						jnvSearchResults.search.noResults = false;
					} else {
						jnvSearchResults.search.noResults = true;
					}

					jnvSearchResults.search.hasMore = data.length === limit;
					jnvSearchResults.search.loading = false;
				}).
				error(function(data, status, headers, config) {
					console.error("SEARCH ERR", data, status, headers);
					jnvSearchResults.search.loading = false;
					jnvSearchResults.search.error = true;
				});
		}
	};
}]);