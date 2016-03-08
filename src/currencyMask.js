/**
 * Created by Reza on 3/8/16.
 */
(function () {

    'use strict';

    /**
     * @ngdoc directive
     * @name crowdFund.directive:payment
     * @description
     * # payment
     */
    angular
        .module('ng-currency', [])
        .directive('priceInput', priceInput);

    /** @ngInject */
    function priceInput() {
        return {
            template: '<input type="text">',
            restrict: 'A',
            scope: {},
            replace: true,
            require: ['priceInput', '^ngModel'],
            controller: priceInputController,
            controllerAs: 'vm',
            transclude: true,
            bindToController: true,
            link: lincFunc
        };

        /** @ngInject */
        function lincFunc(scope, element, attrs, ctrls) {
            var priceInputCtrl = ctrls[0];
            var ngModelCtrl = ctrls[1];
            priceInputCtrl.init(ngModelCtrl, attrs.ngModel);
        }

        /** @ngInject */
        function priceInputController($scope) {
            /* jshint validthis: true */
            var self = this;

            self.init = function (ngModel, modelName) {
                ngModel.$parsers.push(function (value) {
                    return parseCommaSeparated(value);
                });
                ngModel.$formatters.push(function (value) {
                    if (!value) {
                        return;
                    }
                    if (value[value.length - 1] === ',') {
                        value = value.substr(0, value.length - 1);
                    }
                    eval('$scope.$parent.' + modelName + '="' + value + '";');
                    return commaSeparator(value);
                });
                ngModel.$viewChangeListeners.push(function () {
                    var intVal = eval('$scope.$parent.' + modelName + ';');
                    intVal += ',';
                    eval('$scope.$parent.' + modelName + '="' + intVal + '";');
                });
            };

            function commaSeparator(value) {
                value = value.toString().replace(/[,]+/g, '');   //  clear all commas
                value = value.replace(/\D/g, '');
                if (!value.match("^[0-9]+$")) {
                    //  if there is any thing other than digits throw exception
                    return '';
                }
                var maskedValue = '';
                for (var i = value.length - 1; i > -1; i -= 1) {
                    //  construct masked value with new digits
                    maskedValue = ( (value.length - i) % 3 ? '' : ',') + value[i] + maskedValue;
                }
                maskedValue = maskedValue[0] === ',' ? maskedValue.substr(1, maskedValue.length - 1)
                    : maskedValue;  //  clear probable first comma
                return maskedValue;
            }

            function parseCommaSeparated(value) {
                value = value.toString().replace(/[,]+/g, '');   //  clear all commas
                value = value.replace(/\D/g, '');
                if (!value.match("^[0-9]+$")) {
                    //  if there any thing other that digits throw exception
                    return 0;
                }
                return parseInt(value, 10);
            }

        }
    }

})();


