angular.module('Jenova').directive('jnvSearchBar', ["jnvSearch", "jnvSuggestions", "jnvSearchResults", "$timeout", "$document", "$window", "$location", function(jnvSearch, jvnSuggestions, jnvSearchResults, $timeout, $document, $window, $location) {
	return {
		restrict: 'C',
		scope: {
			query: "=",
			clearQuery: "="
		},
		templateUrl: 'directives/searchbar/searchbar.html',
		link: function(scope, elem) {
			var input = elem.find(".searchbar")[0],
				wordStartIndex = 0,
				wordEndIndex;

		var getCaretPosition = function(){
				var caretPos = 0;
				// IE Support
				if ($document.selection) {
					input.focus ();
					var Sel = $document.selection.createRange ();
					Sel.moveStart ('character', -input.value.length);
					caretPos = Sel.text.length;
				}
				// Firefox support
				else if (input.selectionStart || input.selectionStart == '0')
					caretPos = input.selectionStart;

				return caretPos;
			},

			splitQuery = function(){
				var word = scope.query ? scope.query.substring(wordStartIndex, wordEndIndex).replace(' ', '') : '', //without space
					wordPos = -1,
					allWords = scope.query ? scope.query.trim().split(/\s+/) : [],
					preparedWords = [],
					query = '';

				for (var i = 0; i < allWords.length; i++){
					if (word === allWords[i]){
						wordPos = i;
					} else {
						query += (i === 0 ? '' : ' ') + allWords[i];
					}
				}

				return {
					words: allWords,
					pos: wordPos,
					query: query
				};
			};

			scope.showSuggestions = false;
			scope.suggestions = jnvSearchResults.suggestions;

			scope.suggest = function(changed){
				var query = '',
					substring = '',
					cp = getCaretPosition();

				if (cp){
					var i = cp;
					while(i > 0){
						if (scope.query.charAt(--i) === " "){
							wordStartIndex = i + 1;
							break;
						}
					}
					var endIdx = scope.query.indexOf(' ', wordStartIndex);
					wordEndIndex = ~endIdx ? endIdx : scope.query.length || 0;
				}

				var splitted = splitQuery();

				if (!scope.showSuggestions || changed){
					jvnSuggestions.suggest(~splitted.pos ? splitted.words[splitted.pos] : '', splitted.query);
				}
				scope.showSuggestions = true;
			};

			scope.applySuggestion = function(val, clearQuery){
				var splitted = splitQuery(),
					newQuery = '',
					word = val.word;

				if (~splitted.pos){
					splitted.words[splitted.pos] = word;
				} else {
					splitted.words.push(word);
				}

				scope.showSuggestions = false;

				$location.search('q', splitted.words.join(" "));
			};

			scope.search = function($event){
				// enter
				if ($event.which === 13){
					scope.showSuggestions = false;
					$location.search('q', scope.query);
				}
			};

			scope.clearSearchQuery = function(){
				scope.query = '';
				scope.showSuggestions = false;
				scope.clearQuery();
			};

			var handler = function(e) {
				var searchWrapper = elem.find('.search-wrapper'),
					target = angular.element(e.target),
					classes = target.attr("class") ?  "." + target.attr("class").split(" ").join(".") : null;

				if ( !searchWrapper[0].querySelector(classes) && elem !== target ) {
					$timeout(function(){
						wordStartIndex = 0;
						wordEndIndex = 0;
						scope.showSuggestions = false;
					}, 0);
				}
			};
			$document.bind('click', handler);

			scope.$on('$destroy', function() {
				$document.unbind('click', handler);
			});
		}
	};
}]);