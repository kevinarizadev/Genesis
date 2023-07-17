'use strict';
/**
 * @ngdoc directive
 * @name GenesisApp.directive:current
 * @description
 * # current
 */
angular.module('GenesisApp')
  .directive('current', function ($state,$rootScope) {
    return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var el, li, ul, cb, ch,pli;
                el = element;
                li = el.parent();
                ul = li.parent();
                cb = ul.parent();
                ch = cb.siblings();
                pli = cb.parent();
                var check= function(route) {
                    if(route == attrs.uiSref) {
                        el.addClass('active');
                        li.addClass('active');
                        if(cb.length >0 && cb[0].localName != 'aside' && angular.element(cb[0]).attr('id') != 'ili'){
                            cb.attr('visit', attrs.uiSref);
                            cb.css('display','block');
                        }
                        if(ch.length >0 && ch[0].localName != 'header'){
                            ch.addClass('active');
                            ch.attr('visit', attrs.uiSref);
                        }
                        if(pli.length >0 && pli[0].localName != 'div'){
                            pli.addClass('active');
                            pli.attr('visit', attrs.uiSref);
                        }
                    } else {
                        li.removeClass('active');
                        el.removeClass('active');
                        if(cb.attr('visit') == attrs.uiSref && cb.length >0 && cb[0].localName != 'aside'){
                           // cb.css('display','none');
                        }
                        if(ch.attr('visit') == attrs.uiSref && ch.length >0 && ch[0].localName != 'header'){
                            ch.removeClass('active');
                        }
                        if(pli.attr('visit') == attrs.uiSref && pli.length >0 && pli[0].localName != 'div'){
                            pli.removeClass('active');
                        }
                    }
                };
                check($state.current.name);
                $rootScope.$on('$stateChangeStart', function(event, currentRoute, previousRoute) {
                    check(currentRoute.name)
                });
            }
        };
  });
