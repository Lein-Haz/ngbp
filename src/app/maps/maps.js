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

})


;



angular.module('myGmap', [
    'uiGmapgoogle-maps',
    'ui.router',
    'formFun',
    'markers'
])
    .run(function run() {
    })

    .config(function(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            //    key: 'your api key',
            v: '3.17',
            libraries: 'weather,geometry,visualization'
        });
    })


    .controller("gmapController", function($scope, uiGmapGoogleMapApi, formFactory, mapViewFactory, markerDataFactory) {
            // Do stuff with your $scope.
            // Note: Some of the directives require at least something to be defined originally!
            //$scope.map = {center:{latitude:48.395661,longitude:9.989067}, zoom: 18};
            $scope.mapViewVals = mapViewFactory;
            $scope.query = formFactory;
            $scope.map = {center: $scope.mapViewVals.center, zoom: $scope.mapViewVals.zoom};
            $scope.markerList = markerDataFactory;


            /*$scope.myMarkers = [
                {latitude:48,longitude:9, message: 'first one'}
            ];*/
            $scope.click = function(event){
                $scope.query.state = "moving up";
            };


            var theMap = $scope.map;

            // uiGmapGoogleMapApi is a promise.
            // The "then" callback function provides the google.maps object.
            uiGmapGoogleMapApi.then(function(maps) {

                $scope.marker = {
                    idKey: '2',
                    coords: {
                        latitude: 50,
                        longitude: 9.989067
                    }
                };


                google.maps.event.addListener($scope.map, 'click', function(){
                    $scope.query.state = "oh up here?";
                });

                //TODO: change function name
                $scope.mapThis = function(lati,longi){

                    var geocoder = new google.maps.Geocoder();
                    var tempCenter = {center:{latitude:48.395661,longitude:9.989067}};

                    geocoder.geocode({ 'address': $scope.query.street },
                        function (results, status)
                        {
                            if (status == google.maps.GeocoderStatus.OK)
                            {
                                //$scope.map.center.latitude = results[0].geometry.location.B;
                                //$scope.map.center.longitude = results[0].geometry.location.k;
                                tempCenter.center.latitude = results[0].geometry.location.k;
                                tempCenter.center.longitude = results[0].geometry.location.B;
                                angular.copy(tempCenter.center,$scope.query.center);

                                $scope.query.country = status;
                            }
                            else
                            {
                                $scope.mapViewVals.country = "shit";
                            }
                        }
                    );
                };
                $scope.markUp = function(){
                    $scope.markerList.addMarker($scope.query.center.latitude,$scope.query.center.longitude);
                };
                $scope.deleteMarkers = function(){$scope.markerList.killAllMarkers();};

                /*$scope.myMarkers = [
                    {latitude:48,longitude:9, message: 'first one'}
                ];*/
                /*$scope.map = {
                    center: $scope.$storage.params.views.map.location,
                    zoom: $scope.$storage.params.views.map.zoom,
                    events: {
                        click: function() {
                            var bounds = new google.maps.LatLngBounds();
                            for (var i in $scope.filteredHomes) {
                                bounds.extend($scope.filteredHomes[i].location);
                            }
                            $scope.map.fitBounds(bounds);
                        }
                    }
                };*/
            });
    })
    .controller('clickEventController', ['$scope','$click','formFactory', function($scope, $click, formFactory){
        $scope.click = function(event){
            var qq = formFactory;
            qq.state = "whooopdee";
        };


    }])
        //this should define the map view
    .factory('mapViewFactory', function(){
            var service ={};
            var mapCoords = {
                street: '',
                city: '',
                state: '',
                zip: '',
                country: '',
                zoom: 18,
                center: {
                    latitude: 48.395661,
                    longitude: 9.989067
                }
            };
            //wow how not intuitive to get pass by value working
            /*service.setStreet = function(street){mapCoords.street = street;};
            service.setCity = function(city){mapCoords.city = city;};
            service.setState = function(state){mapCoords.state = state;};
            service.setZip = function(zip){mapCoords.zip = zip;};
            service.setCountry = function(country){mapCoords.country = country;};
            service.setZoom = function(zoom){mapCoords.zoom = zoom;};
            service.getStreet = function(){ return mapCoords.street;};
            service.getCity = function(){ return mapCoords.city;};
            service.getState = function(){ return mapCoords.state;};
            service.getZip = function(){ return mapCoords.zip;};
            service.getCountry = function(){ return mapCoords.country;};
            service.getZoom = function(){ return mapCoords.zoom;};

            service.setCenter = function(center){mapCoords.center = center;};
            service.getCenter = function(){return mapCoords.center;};

            service.setCoords = function(mapCoords){this.mapCoords = mapCoords;};
            service.getCoords = function(){return mapCoords;};*/

            return mapCoords;
        })
;

angular.module('formFun',[
    'ui.router',
    'myGmap'
])
    .controller('formController',['$scope','formFactory','mapViewFactory',function($scope, formFactory, mapViewFactory){
        //$scope.country = input;

        $scope.query = formFactory;
        $scope.mapViewVals = mapViewFactory;



        $scope.lookUp = function(input){
            angular.copy($scope.query.center,$scope.mapViewVals.center);
            //$scope.mapViewVals.setCenter($scope.query.center);
            //$scope.map = {center: $scope.mapViewVals.getCenter(), zoom: $scope.mapViewVals.getZoom()};
        };
    }])


    //this is for the form!
    .factory('formFactory', function(){
        var someCoords = {
            street:'16253 Swingley Ridge Rd',
            city: 'wee',
            state: '',
            zip: '63017',
            country : '',
            zoom:'',
            center: {
                latitude: 39.281894,
                longitude: -76.613421
            }
        };

        return someCoords;
    })

;

