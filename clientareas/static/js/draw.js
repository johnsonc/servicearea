(function($){
    function initialize() {
      var mapOptions = {
        center: new google.maps.LatLng(-34.397, 150.644),
        zoom: 8
      };

      var map = new google.maps.Map(document.getElementById('map_canvas'),
        mapOptions);

      var drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.MARKER,
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [
            google.maps.drawing.OverlayType.POLYGON,
          ]
        }
      });
      drawingManager.setMap(map);
    }

    google.maps.event.addDomListener(window, 'load', initialize);

})($);