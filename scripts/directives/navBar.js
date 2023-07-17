'use strict';

/**
 * @ngdoc directive
 * @name GenesisApp.directive:navbar
 * @description
 * # navbar
 */
 angular.module('GenesisApp')
 .directive('navBar', function ($rootScope,$compile) {
 	return {
            restrict: 'EA',
            templateUrl: 'views/navBar.html',
            replace: true,
            controller:'navbarcontroller',
            controllerAs:'ipctrl',
            link: function(scope, element) {
                $compile(element.contents())($rootScope);
                angular.element('.notif-btn').dropdown({
                    inDuration: 300,
                    outDuration: 225,
                    constrain_width: false, // Does not change width of dropdown to that of the activator
                    hover: true, // Activate on hover
                    gutter: 0, // Spacing from edge
                    belowOrigin: true, // Displays dropdown below the button
                    alignment: 'right' // Displays dropdown with edge aligned to the left of button
                    }
                );
                angular.element('.collapsible').collapsible();
                // autocomplete simulation
                var countries = [{value: "Alabama"}, {value: "Alaska"}, { value: "Arizona"}, {value: "Arkansas"}, {value: "California"},
                    {value: "Colorado"}, {value: "Connecticut"}, {value: "District of Columbia"}, {value: "Delaware"}, {value: "Florida"},
                    {value: "Georgia"}, {value: "Hawaii"}, {value: "Idaho"}, { value: "Indiana"}, {value: "Iowa"}, {value: "Kansas"}, {value: "Kentucky"},
                    {value: "Louisiana"}, {value: "Maine"}
                ];
                var input = angular.element('.search-top-bar #search');
                if (input.hasClass('autocomplete')) {
                    var inputDiv = input.closest('div');
                    var searchHtml = '<ul class="autocomplete-results hide">';
                    for (var i = 0; i < countries.length; i++) {
                        searchHtml += '<li class="result"><span>' + countries[i]['value'] + '</span></li>';
                    }
                    searchHtml += '</ul>';
                    inputDiv.append(searchHtml);
                    input.on('keyup', input, function() {
                        var $val = input.val().trim(),
                            $select = angular.element('.autocomplete-results');
                        $select.css('width',input.width());
                        if ($val != '') {
                            $select.children('li').addClass('hide');
                            $select.children('li').filter(function() {
                                $select.removeClass('hide');
                                var check = true;
                                for (var i in $val) {
                                    if ($val[i].toLowerCase() !== angular.element(this).text().toLowerCase()[i])
                                        check = false;
                                }
                                return check ? angular.element(this).text().toLowerCase().indexOf($val.toLowerCase()) !== -1 : false;
                            }).removeClass('hide');
                        } else {
                            $select.children('li').addClass('hide');
                        }
                    });
                    angular.element('.result').click(function() {
                        input.val(angular.element(this).text().trim());
                        angular.element('.result').addClass('hide');
                    });
                    angular.element("#search-hover").click(function(e){
                        angular.element("#dropdown2").hide();
                        angular.element("#search").trigger("focus");
                    });
                }
            }
        };
 });


