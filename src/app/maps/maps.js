/**
 * Created by Phil on 4/27/2015.
 */

//dependencies and angular declaration
angular.module('ngBoilerplate.maps',[
    'ui.router'
])

    .config(function config($stateProvider){
        $stateProvider.state('maps',{
            url:'/maps',
            views: {
                "main": {
                    controller: 'mapController',
                    templateUrl: 'maps/maptest.tpl.html'
                }
            },
            data: {
                pageTitle:'This is a maptest!'
            }
        });
    })
    .controller ('mapController', function mapController($scope){
    //TODO: good code goes here
});

angular.module('forFun',[
    'ui.router'
])
    .controller('formController',['$scope',function($scope){
        $scope.city = 'nothing yet';

        $scope.lookUp = function(input){
            $scope.city = input;
        };
    }])
;