(function(angular) {
    'use strict';
    angular.module('FileManagerApp').controller('ModalFileManagerCtrl', 
        ['$scope', '$rootScope', 'fileNavigator', 'fileManagerConfig', function($scope, $rootScope, FileNavigator, fileManagerConfig) {
        
        $scope.config = angular.merge(fileManagerConfig, $scope.$parent.$parent.config);
        $scope.isOriginal = $scope.$parent.$parent.isOriginal;
        $scope.listpath = $scope.$parent.$parent.listpath;
        $scope.imageonly = $scope.$parent.$parent.imageonly;
        $scope.reverse = false;
        $scope.predicate = ['model.type', 'model.name'];
        var _params = {
            isOriginal: $scope.isOriginal,
            listPath: $scope.listpath,
            path: $scope.listpath,
            isPath:  $scope.$parent.$parent.isPath
        };
        $scope.fileNavigator = new FileNavigator($scope.config, _params);
        $rootScope.selectedModalPath = [];
        
        $scope.order = function(predicate) {
            $scope.reverse = ($scope.predicate[1] === predicate) ? !$scope.reverse : false;
            $scope.predicate[1] = predicate;
        };

        $scope.select = function(item) {
            $rootScope.selectedModalPath = item.model.fullPath().split('/').filter(Boolean);
            $scope.modal('selector', true);
        };

        $scope.selectCurrent = function() {
            $rootScope.selectedModalPath = $scope.fileNavigator.currentPath;
            $scope.modal('selector', true);
        };

        $scope.selectedFilesAreChildOfPath = function(item) {
            var path = item.model.fullPath();
            return $scope.temps.find(function(item) {
                var itemPath = item.model.fullPath();
                if (path == itemPath) {
                    return true;
                }
                /*
                if (path.startsWith(itemPath)) {
                    fixme names in same folder like folder-one and folder-one-two
                    at the moment fixed hidding affected folders
                }
                */
            });
        };

        $rootScope.openNavigator = function(path) {
            $scope.fileNavigator.currentPath = path;
            $scope.fileNavigator.refresh(_params);
            $scope.modal('selector');
        };

        $rootScope.getSelectedPath = function() {
            var path = $rootScope.selectedModalPath.filter(Boolean);
            var result = '/' + path.join('/');
            if ($scope.singleSelection() && !$scope.singleSelection().isFolder()) {
                result += '/' + $scope.singleSelection().tempModel.name;
            }
            return result.replace(/\/\//, '/');
        };

    }]);
})(angular);
