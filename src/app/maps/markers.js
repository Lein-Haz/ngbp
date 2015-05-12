/**
 * Created by Phil on 5/10/2015.
 */
angular.module('markers',[
    'ui.router'
])

    .factory('markerDataFactory',function(){
        var markerList = [];
        var service = {};


        /*var markerList = [{
                idKey: '0',
                message:"",
                coords:{
                    latitude:42,
                    longitude:42
                }
            },
            {
                 idKey: '1',
                 message:"hello",
                 coords:{
                     latitude:48.4,
                     longitude:10
                 }
            }
        ];*/

        function Marker(latitude, longitude){
            this.idKey = markerList.length;
            this.coords = new Coords(latitude,longitude);
            this.message = "Marker number: " + (markerList.length+1);
        }
        function Coords(latitude,longitude){
            this.latitude = latitude;
            this.longitude = longitude;
        }
        service.getMessage = function(id){
            return markerList[id].message;
        };
        service.setMessage = function(id, message){
            markerList[id].message = message;
        };

        service.getCoords = function ()
        {
            
        };

        service.addMarker = function(latitude, longitude){
            markerList[markerList.length] = new Marker(latitude, longitude);
        };
        service.getMarkerList = function(){return markerList;};
        service.killAllMarkers = function(){
            markerList = [];
        };

        return service;
        //return markerList;



    })

/*var markerList = [{
    idKey: '0',
    message:"",
    coords:{
        latitude:42,
        longitude:42
    }
},
    {
        idKey: '1',
        message:"hello",
        coords:{
            latitude:48.4,
            longitude:10
        }
    }
];*/
;