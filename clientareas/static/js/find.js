(function(){
      var map, drawingManager, marker, features;

      function clearAreas () {
        if (features) {
          for (var i = 0; i < features.length; i++) {
            map.data.remove(features[i]);
          }
        }
      }

      function findAreas () {
        clearAreas();
        var get = {lat: marker.position.lat(), lng:marker.position.lng()};
        $.getJSON('/api/areas/', get,
          function (data) {
            features = map.data.addGeoJson(data);
            listAreas(features);
          }
        );
      }

      function listAreas () {
        var $results = $('.results');
        $results.empty();
        var $ul = $('<ul>');
        $ul.appendTo($results);
        for (var i = 0; i < features.length; i++) {
          $('<li>'+features[i].getProperty('name')+'</li>').appendTo($ul);
        }
      }

      function clearMarker() {
        if ( marker ) {
          marker.setMap(null);
        }
      }

      function setMarker(newMarker) {
        clearMarker();
        marker = newMarker;
        findAreas();
      }

      function initialize() {
        map = new google.maps.Map(document.getElementById('map_canvas'), {
          zoom: 10,
          center: new google.maps.LatLng(22.344, 114.048),
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true,
          zoomControl: true
        });

        // Creates a drawing manager attached to the map that allows the user to draw
        // markers, lines, and shapes.
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

        google.maps.event.addListener(drawingManager, 'overlaycomplete', function(e) {
           if (e.type == google.maps.drawing.OverlayType.MARKER) {
            var newMarker = e.overlay;
            newMarker.type = e.type;
            setMarker(newMarker);
          }
        });
      }
      google.maps.event.addDomListener(window, 'load', initialize);


})();