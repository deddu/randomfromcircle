'use strict';
angular.module('circledistributionApp')
    .directive('focus', function() {
    return {
        link: function(scope, element, attrs) {
            element[0].focus();
        }
    }; });
