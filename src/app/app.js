angular.module('ngBoilerplate', [
    'templates-app',
    'templates-common',
    'ngBoilerplate.home',
    'ngBoilerplate.about',
    'ui.router',
    'ngBoilerplate.maps',
    'formFun',
    'myGmap'
])

    .config(function myAppConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
    })



    .controller('AppCtrl', function AppCtrl($scope, $location) {
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | ngBoilerplate';
            }
        });
    })

;

//this is all copied from the getting started section
angular.module('myGmap', ['uiGmapgoogle-maps'])
    .run(function run() {
    })

    .config(function(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            //    key: 'your api key',
            v: '3.17',
            libraries: 'weather,geometry,visualization'
        });
    })


    .controller("gmapController", function($scope, uiGmapGoogleMapApi) {
        // Do stuff with your $scope.
        // Note: Some of the directives require at least something to be defined originally!
        $scope.map = {center:{latitude:48.395661,longitude:9.989067}, zoom: 18};

        var city = "Tokyo";
        // e.g. $scope.markers = []

        // uiGmapGoogleMapApi is a promise.
        // The "then" callback function provides the google.maps object.
        uiGmapGoogleMapApi.then(function(maps) {

        });
    })
;


