'use strict';
/**
 * @ngdoc directive
 * @name GenesisApp.directive:uploaderModel
 * @description
 * # uploaderModel
 */
 angular.module('GenesisApp')
 .directive('uploaderModel',["$parse", function ($parse) {
 	return {
            restrict: 'A',
            link: function( scope, iElement, iAttrs ) {
               iElement.on("change",function(e)
               {
                  $parse(iAttrs.uploaderModel).assign(scope, iElement[0].files[0]);
                });
            }
        };
 }]);


