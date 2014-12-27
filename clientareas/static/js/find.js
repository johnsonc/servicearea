(function(){
      var map, drawingManager, marker, features;

      function clearAreas () {
        /*
        Remove all areas of feature array from the map
        */
        if (features) {
          for (var i = 0; i < features.length; i++) {
            map.data.remove(features[i]);
          }
        }
      }

      function findAreas () {
        /*
        Using marker position query the backend to find all areas that contains that point
        */
        clearAreas();
        var get = {lat: marker.position.lat(), lng:marker.position.lng()};
        $.getJSON('/api/areas/', get,
          function (data) {
            // Draw all areas in the map
            features = map.data.addGeoJson(data);
            // Add all areas description to "List Area" element on the DOM
            listAreas(features);
          }
        );
      }

      function listAreas () {
        /*
        List all areas, of feature array, in the DOM inside "result" object
        */
        // clear existing results
        var $results = $('.results');
        $results.empty();
        // iterate feature and insert area name
        var $ul = $('<ul>');
        $ul.appendTo($results);
        for (var i = 0; i < features.length; i++) {
          $('<li>'+features[i].getProperty('name')+'</li>').appendTo($ul);
        }
      }

      function clearMarker() {
        /*
        Remove previous marker from the map
        */
        if ( marker ) {
          marker.setMap(null);
        }
      }

      function setMarker(newMarker) {
        /*
        Draw marker on the map and find all areas that contains that location
        */
        clearMarker();
        marker = newMarker;
        findAreas();
      }

      function initialize() {
        // Create map on the canvas
        map = new google.maps.Map(document.getElementById('map_canvas'), {
          zoom: 10,
          center: new google.maps.LatLng(22.344, 114.048),
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true,
          zoomControl: true
        });

        // Creates a drawing manager attached to the map that allows the user to draw markers.
        drawingManager = new google.maps.drawing.DrawingManager({
          drawingMode: google.maps.drawing.OverlayType.MARKER,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
              google.maps.drawing.OverlayType.MARKER
            ]
          },
          map: map
        });

        // Add event listener to detect new markers on the pate
        google.maps.event.addListener(drawingManager, 'overlaycomplete', function(e) {
           if (e.type == google.maps.drawing.OverlayType.MARKER) {
            var newMarker = e.overlay;
            newMarker.type = e.type;
            setMarker(newMarker);
          }
        });
      }
      // Initialize map
      google.maps.event.addDomListener(window, 'load', initialize);


})();