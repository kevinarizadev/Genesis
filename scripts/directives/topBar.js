'use strict';

/**
 * @ngdoc directive
 * @name GenesisApp.directive:topbar
 * @description
 * # topbar
 */
 angular.module('GenesisApp')
 .directive('topBar', function ($rootScope,$compile) {
 	return {
            restrict: 'EA',
            templateUrl: 'views/topBar.html',
            replace: true,
            link: function( scope, element ) {
                $rootScope.navigationStyle = ThemeSettings.getCookie('navigation-style');
                scope.$watch('navigationStyle', function() {
                    if ( scope.navigationStyle == 'horizontal' ) {
                        element.css('display', 'block');
                    } else {
                        element.css('display', 'none');
                    }
                });
                $compile(element.contents())($rootScope);
                angular.element('.dropdown-button').dropdown({
                    inDuration: 300,
                    outDuration: 225,
                    constrain_width: false, // Does not change width of dropdown to that of the activator
                    hover: true, // Activate on hover
                    gutter: 0, // Spacing from edge
                    belowOrigin: true, // Displays dropdown below the button
                    alignment: 'right' // Displays dropdown with edge aligned to the left of button
                });
                angular.element('.collapsible').collapsible();
            }
        };
 });


