angular.module('Jenova').directive('jnvSuggestionBar', ["jnvSuggestions", "jnvSearchResults", "$timeout", "$window", function(jvnSuggestions, jnvSearchResults, $timeout, $window) {
	return {
		restrict: 'C',
		scope: {
			query: "=",
			onSuggest: "="
		},
		templateUrl: 'directives/suggestionbar/suggestionbar.html',
		link: function(scope, elm) {
			var suggestionBar = $(".suggestions"),
				scrollWidth = 400;

			var checkScrollAbility = function(){
				var lastSuggestion = suggestionBar.find(".suggestion:last");
				if (!lastSuggestion.length) return;

				var windowWidth = $window.outerWidth,
					ulWidth = lastSuggestion.offset().left + lastSuggestion.outerWidth();

				if (ulWidth > windowWidth){
					scope.rightScrollAbility = true;
				}
			};

			var checkNextScrollAbility = function(prevVal){
				var scrollPos = suggestionBar.scrollLeft();

				return Math.abs(prevVal - scrollPos) === scrollWidth && scrollPos !== 0;
			};

			scope.scrollRight = function(){
				var leftPos = suggestionBar.scrollLeft();
				suggestionBar.animate({scrollLeft: leftPos + scrollWidth}, 400);
				scope.leftScrollAbility = true;
				$timeout(function(){
					if (!checkNextScrollAbility(leftPos)) scope.rightScrollAbility = false;
				}, 500);
			};

			scope.scrollLeft = function(){
				var leftPos = suggestionBar.scrollLeft();
				suggestionBar.animate({scrollLeft: leftPos - scrollWidth}, 400);
				scope.rightScrollAbility = true;
				$timeout(function(){
					if (!checkNextScrollAbility(leftPos)) scope.leftScrollAbility = false;
				}, 500);
			};

			jvnSuggestions.suggestBar();
			scope.suggestions = jnvSearchResults.suggestionsBlock;


			scope.$watch('suggestions.data.length', function(newVal, oldVal){
				if (newVal != oldVal) $timeout(checkScrollAbility, 0);
			});

			angular.element($window).bind('resize', function () {
				$timeout(checkScrollAbility, 0);
			});

			$timeout(checkScrollAbility, 0);

			var getNexSuggestions = function(){
				jvnSuggestions.suggestBar(scope.query, scope.suggestions.data.length);
			};

			var scrollIsDisabled = function(){
				return scope.suggestions.loading || !scope.suggestions.hasMore || scope.suggestions.error;
			};

			var loadNext = function(e){
				if (scrollIsDisabled()) return true; // all snippets already loaded or nothing to show
				if (elm.data("pending")) return true;   // already in progress
				var $this = angular.element(this);
				var rectification = scrollWidth * 2; // start loading before scrolling bottom
				if ($this.width() + $this.offset().left + rectification > $this.find(".suggestion:last").width() + $this.find(".suggestion:last").offset().left ) {
					//console.error("!!!");
					//elm.data("pending", true);          // block for next call

					getNexSuggestions();
				}
			};
			suggestionBar.on("scroll", loadNext);    // note:  scrollable container should be changed outside

			//disable mouse scroll

			suggestionBar.on('mousewheel', function(e){
				e.preventDefault();
				e.stopPropagation();
				return false;
			});
		}
	};
}]);