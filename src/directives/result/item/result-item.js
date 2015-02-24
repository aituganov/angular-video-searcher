angular.module('Jenova').directive('jnvResultItem', function(){
	return {
		restrict: 'C',
		scope: {
			resultItem: "="
		},
		templateUrl: 'directives/result/item/result-item.html',
		link: function(scope, elm) {
			//fallback;
			function loadImage(url) {
				var timer,
					altUrl = 'img/image-not-found.png';

				function setBackground(url){
					elm.find('.preview-container').css({
						'background-image': 'url(' + url + ')',
						'background-size' : 'cover'
					});
				}

				function clearTimer() {
					if (timer) {
						clearTimeout(timer);
						timer = null;
					}
				}

				function handleFail() {
					// kill previous error handlers
					this.onload = this.onabort = this.onerror = function() {};
					// stop existing timer
					clearTimer();
					setBackground(altUrl);
				}

				var img = new Image();
				img.onerror = img.onabort = handleFail;
				img.onload = function() {
					clearTimer();
					setBackground(url);
				};

				img.src = url;
				timer = setTimeout(function(theImg) {
					return function() {
						handleFail.call(theImg);
					};
				}(img), 5000);

				return(img);
			}

			loadImage(scope.resultItem.image);

			scope.makeLinkToVideo = function(video_link){
				return "//vk.com/" + video_link;
			};
		}
	};
});