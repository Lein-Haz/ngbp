/**
 * Created by Phil on 5/10/2015.
 */
angular.module('markers',[
    'ui.router'
])

    .factory('markerDataFactory',function(){
        var markerList = [];//create empty array
        var service = {};//service object

        function Marker(latitude, longitude){//define marker object
            this.idKey = markerList.length;
            this.coords = new Coords(latitude,longitude);
            this.message = "Marker number: " + (markerList.length+1);
        }
        function Coords(latitude,longitude){//define coords obj
            this.latitude = latitude;
            this.longitude = longitude;
        }
        service.getMessage = function(id){//returns marker message
            return markerList[id].message;
        };
        service.setMessage = function(id, message){//sets marker message
            markerList[id].message = message;
        };

        service.getCoords = function (id)//returns coords object
        {
            return markerList[id].coords;
        };

        service.addMarker = function(latitude, longitude){//function to place marker at LatLongi passed
            markerList[markerList.length] = new Marker(latitude, longitude);
        };
        service.getMarkerList = function(){return markerList;};//returns the list of markers
        service.killAllMarkers = function(){//kills all the poor little markers
            markerList = [];//by creating a new list
        };

        return service;//gives access to functions
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