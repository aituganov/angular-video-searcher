angular.module('Jenova').service('jnvSearchResults', function(){
	return {
		search: {
			data: [],
			loading: false,
			hasMore: false,
			error: false,
			noResults: null
		},
		suggestions: {
			data: [],
			loading: false,
			hasMore: false,
			error: false,
			noResults: null
		},
		suggestionsBlock: {
			data: [],
			loading: false,
			hasMore: false,
			error: false,
			noResults: null
		}
	};
});