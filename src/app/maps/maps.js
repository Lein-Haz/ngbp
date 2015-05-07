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

angular.module('formFun',[
    'ui.router',
    'myGmap'
])
    .controller('formController',['$scope',function($scope){
        $scope.query = {city: 'wee',
            country : ''
        };

        $scope.lookUp = function(input){
            $scope.country = input;




        };
    }])
    .directive('formData',['$scope', function($scope){
        function formLink(scope,element,attrs){
            var city,
                country;

            city = $scope.query.city;
            $scope.query.country = city;

            //element.replaceWith(angular.element('<pre>' +  $element.text() + '</pre>'));//TODO: figure out what the balls am i doing
        }

        return {
            link: formLink
        };
    }])

;
/*angular.module('maps',['ui.router'])

    .controller('atest',['$scope',function($scope){


    }]
);*/