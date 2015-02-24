var app = angular.module('Jenova', ['ngAnimate', 'ui.bootstrap', 'infinite-scroll', 'angularSpinner', 'pascalprecht.translate']);

app.config(['$locationProvider', function($locationProvider) {
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
}]);

app.config(['$translateProvider', function($translateProvider) {
	var supportedLocales = ['en', 'ru'];
	$translateProvider.translations(supportedLocales[0], {
		SEARCH_TOOLTIP: 'Type to search',
		RANDOM_TOOLTIP: 'Random video',
		ABOUT_US: 'about us',
		FEEDBACK: 'feedback',
		SEND: 'Send',
		SEND_FEEDBACK: 'Send Feedback',
		MY_IDEA_IS: 'My idea is...',
		SORRY: 'Sorry',
		NO_RESULT: 'No results found. Please try to change it or search for',
		RANDOM_VIDEO: 'random video',
		ON_ERROR: {
			OOPS: 'Oops',
			MESS_BEGIN: 'Something went wrong. Try to ',
			MESS_MIDDLE: 'refresh page',
			MESS_END: ' later.'
		}
	})
	.translations(supportedLocales[1], {
		SEARCH_TOOLTIP: 'Поиск',
		RANDOM_TOOLTIP: 'Случайные',
		ABOUT_US: 'о нас',
		FEEDBACK: 'отзыв',
		SEND: 'Отправить',
		SEND_FEEDBACK: 'Оставьте ваш отзыв',
		MY_IDEA_IS: 'Моя идея заклчается в следующем...',
		SORRY: 'Извините',
		NO_RESULT: 'Видеозаписи не найдены. Попробуйте изменить условия поиска или посмотреть',
		RANDOM_VIDEO: 'случайные видео',
		ON_ERROR: {
			OOPS: 'Упс...',
			MESS_BEGIN: 'Что-то пошло не так. Попробуйте ',
			MESS_MIDDLE: 'обновить страницу',
			MESS_END: ' позднее.'
		}
	});

	$translateProvider.preferredLanguage('en');

	$translateProvider.determinePreferredLanguage(function () {
		var currentLocale = navigator.language.split('-')[0];
		if (supportedLocales.indexOf(currentLocale) >= 0) $translateProvider.use(currentLocale);
	});
}]);