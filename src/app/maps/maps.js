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
                    controller: 'formController',
                    templateUrl: 'maps/maptest.tpl.html'
                }
            },
            data: {
                pageTitle:'Merps!'
            }
        });
    })
    .controller('formController',['$scope','formFactory','mapViewFactory',function($scope, formFactory, mapViewFactory){
        //$scope.country = input;

        $scope.query = formFactory;
        $scope.mapViewVals = mapViewFactory;

        $scope.focusMap = function(){
            angular.copy($scope.query.center,$scope.mapViewVals.center);
        };
    }])


    //For the form! Query item so that the map isn't moving around
    .factory('formFactory', function(){
        var someCoords = {
            street:'16253 Swingley Ridge Rd',
            city: '',
            state: '',
            zip: '',
            country : '',
            zoom:'',
            center: {
                latitude: null,
                longitude: null
            }
        };
        return someCoords;
    })
;



angular.module('myGmap', [
    'uiGmapgoogle-maps',
    'ui.router'
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
        $scope.mapViewVals = mapViewFactory;//reference to map, basically values for the center of map
        $scope.query = formFactory;//what you type into the forms cause i didn't want typing into forms to move map around
        $scope.markerList = markerDataFactory;//the markers

        // Do stuff with your $scope.
        // Note: Some of the directives require at least something to be defined originally!
        // function for assigning query values to map so that map position reflects query
        function updateMapPos()
        {
            angular.copy($scope.query.center,$scope.mapViewVals.center);//update mapView
        }

            // uiGmapGoogleMapApi is a promise.
            // The "then" callback function provides the google.maps object.
            uiGmapGoogleMapApi.then(function(maps) {
                /*$scope.map = {center: $scope.mapViewVals.center, zoom: $scope.mapViewVals.zoom, events: [{click : clickHandler(maps,event,myArgs)}]};//it can't find clicker TODO: fix that
                $scope.clickHandler = function(maps, event, myArgs){//clicker s right here
                    $scope.query.state = "moving up";//just so I can see something happen
                };*/
                $scope.map = {center: $scope.mapViewVals.center, zoom: $scope.mapViewVals.zoom, events: [{click : function(maps, event, myArgs){//tried doing event inline no better
                    $scope.query.state = "moving up";
                }}]};


                $scope.search = function(){

                    /*if they entered something into street address prefer geocode look up
                    otherwise search by Lat and Longi
                    */
                    if($scope.query.street !== ""){


                        var geocoder = new google.maps.Geocoder();//instantiating geocoder

                        //var bounds = $scope.map.getBounds();
                        var tempCenter = {center: {latitude: 48.395661, longitude: 9.989067}};//temp var for copying. I think i did this cause of the reference thing

                        geocoder.geocode({'address': $scope.query.street},//geocode query passing in address
                            function (results, status)
                            {
                                if (status == google.maps.GeocoderStatus.OK)
                                {
                                    tempCenter.center.latitude = results[0].geometry.location.k;//set latitude
                                    tempCenter.center.longitude = results[0].geometry.location.B;//set longitude
                                    angular.copy(tempCenter.center, $scope.query.center); //update query's LatLongi
                                    updateMapPos();

                                    $scope.query.country = status;
                                }else if(status == google.maps.GeocoderStatus.INVALID_REQUEST){
                                    alert("No results for address entered");

                                }
                            }
                        );
                    } else { //search by lat&longi
                        updateMapPos();
                    }

                };
                $scope.markSearch = function(){
                    $scope.markerList.addMarker($scope.query.center.latitude,$scope.query.center.longitude);
                };
                $scope.markCurrent = function () {
                    $scope.markerList.addMarker($scope.mapViewVals.center.latitude,$scope.mapViewVals.center.longitude);
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

        //this defines the map view
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



