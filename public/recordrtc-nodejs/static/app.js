'use strict';

angular.module("app", [])
.controller('myCtrl', function ($scope, $http) {

    $scope.take_snapshot = function() {
            // take snapshot and get image data
            Webcam.snap(function() {
                // display results in page
                <!-- document.getElementById('results').innerHTML =  -->
                <!-- '<h2>Here is your image:</h2>' +  -->
                <!-- '<canvas src="'+data_uri+'"/>'; -->
            }, myCanvas);
            var canvas = document.getElementById("myCanvas");
            // draw to canvas...
            canvas.toBlob(function(blob) {
                saveAs(blob, "test.png");
            });
        }
});