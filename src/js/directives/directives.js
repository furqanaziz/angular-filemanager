(function(angular) {
    'use strict';
    var app = angular.module('FileManagerApp');

    app.directive('angularFilemanager', ['$parse', 'fileManagerConfig', function($parse, fileManagerConfig) {
        return {
          restrict: 'EA',
          scope: true,
          link: function (scope, element, attrs) {
              scope.isOriginal = attrs.isoriginal;
              scope.imageonly = attrs.imageonly;
              scope.listpath = attrs.path;
              scope.config = scope.config || {};
              if(attrs && attrs.config)
                scope.config = JSON.parse(attrs.config) || {};
              console.log(scope.config);
              scope.templateUrl = ('tplPath' in scope.config) ? scope.config.tplPath : fileManagerConfig.tplPath;
          },
          controllerAs: 'vm',
          template: '<div ng-include="templateUrl + \'/main.html\'"></div>'
          
        };
    }]);
//templateUrl: fileManagerConfig.tplPath + '/main.html'
    app.directive('ngFile', ['$parse', function($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.ngFile);
                var modelSetter = model.assign;

                element.bind('change', function() {
                    scope.$apply(function() {
                        modelSetter(scope, element[0].files);
                    });
                });
            }
        };
    }]);

    app.directive('ngRightClick', ['$parse', function($parse) {
        return function(scope, element, attrs) {
            var fn = $parse(attrs.ngRightClick);
            element.bind('contextmenu', function(event) {
                scope.$apply(function() {
                    event.preventDefault();
                    fn(scope, {$event: event});
                });
            });
        };
    }]);

})(angular);
