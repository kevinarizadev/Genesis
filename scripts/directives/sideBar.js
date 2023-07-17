'use strict';

/**
 * @ngdoc directive
 * @name GenesisApp.directive:sidebar
 * @description
 * # sidebar
 */
 angular.module('GenesisApp')
 .directive('sideBar', function ($rootScope,$compile) {
 	return {
 		templateUrl: 'views/sideBar.html',
 		restrict: 'EA',
 		replace: true,
 		link: function(scope, element) {
 			$rootScope.navigationStyle = ThemeSettings.getCookie('navigation-style');
 			scope.$watch('navigationStyle', function() {
 				if ( scope.navigationStyle != 'horizontal' ) {
 					element.find('ul.side-nav').css('transform', '');
 				} else {
 					element.find('ul.side-nav').css('transform', 'translateX(-100%)');
 				}
 			});
 			$compile(element.contents())($rootScope);
 			angular.element('.button-collapse').sideNav({
                        menuWidth: 240, // Default is 240
                        edge: typeof ThemeSettings != "undefined" && ThemeSettings.getCookie('reading-direction') == 'rtl' ? 'right' :'left', // Choose the horizontal origin
                        closeOnClick: false // Closes side-nav on <a> clicks, useful for Angular/Meteor
                    }
                    );
 		}
 	};
 });


