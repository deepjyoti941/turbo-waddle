"use strict";

/**
 * @ngdoc directive
 * @restrict EA
 * @element
 *
 * @description
 *
 * @example
 <example module="app">
 <file name="index.html">
 <angular-star-rating></angular-star-rating>
 </file>
 </example>
 *
 */
angular.module('app').directive('angularStarRating', function() {
    var directive = {
        restrict: 'EA',
        scope: {
            'value': '=value',
            'max': '=max',
            'hover': '=hover',
            'isReadonly': '=isReadonly'
        },
        link: linkFunc,
        template:
        '<span ng-class="{isReadonly: isReadonly}">' +
        '<i ng-class="renderObj" style="padding: 2px;"' +
        'ng-repeat="renderObj in renderAry" ' +
        'ng-click="setValue($index)" ' +
        'ng-mouseenter="changeValue($index, changeOnHover )" >' +
        '</i>' +
        '</span>',
        replace: true
    };
    return directive;

    function linkFunc(scope, element, attrs, ctrl) {
        if (scope.max === undefined) scope.max = 5; // default

        function renderValue() {
            scope.renderAry = [];
            for (var i = 0; i < scope.max; i++) {
                if (i < scope.value) {
                    scope.renderAry.push({
                        'fa fa-heart': true
                    });
                } else {
                    scope.renderAry.push({
                        'fa fa-heart-o': true
                    });
                }
            }
        }

        scope.setValue = function (index) {
            if (!scope.isReadonly && scope.isReadonly !== undefined) {
                scope.value = index + 1;
            }
        };

        scope.changeValue = function (index) {
            if (scope.hover) {
                scope.setValue(index);
            } else {
                // !scope.changeOnhover && scope.changeOnhover != undefined
            }
        };

        scope.$watch('value', function (newValue, oldValue) {
            if (newValue) {
                renderValue();
            }
        });

        scope.$watch('max', function (newValue, oldValue) {
            if (newValue) {
                renderValue();
            }
        });

    }
});