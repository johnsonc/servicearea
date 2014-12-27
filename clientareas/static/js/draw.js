(function(){
      var drawingManager,
          selectedShape,
          map,
          shapes = new Array();

      function submitForm(event) {
        /*
        Manage submit form and perform object creation on the Backend
        This function also perform some basis error handling in the form.
        */
        // clear exsiting messages if any
        var $msg = $('.messages');
        $msg.empty();
        // Perform ajax call to Backend with the name of the area and the encoded string
        // of the MultiPolygon (in json)
        $.ajax({
          type: "POST",
          url: "/api/areas/",
          data: { name: $(this).find('#name').val(), mpoly: encodeMPoly()}
        })
        // Basic Message Handling for success and fail
        .success(function(){
          $msg.append($('<div class="alert alert-success">Area successfully saved!.</div>'));
        })
        .fail(function(data){
          if(data.status == 400){
            $.each(data.responseJSON, function( key, value ) {
              $msg.append($('<div class="alert alert-danger">'+key+': '+value+'</div>'));
            });
          }else{
            $msg.append($('<div class="alert alert-danger">Create a valid area.</div>'));
          }
        });
        event.preventDefault();
      }

      function encodeMPoly () {
        /*
        Encode shapes array from a list of Google Maps shapes to a MultiPolygon
        geoJson object
        */
        // return empty string if there's not shapes
        if (!shapes || shapes.length == 0) {
          return ''
        }
        // Create coordinates array for multi polygons using areas array
        var coords = new Array();
        // Iterate shapes
        for(var i=0; i<shapes.length; i++) {
          var shapeCoords = new Array(),
              shape = shapes[i],
              path = shape.getPath();
          // iterate the path of each shape
          for (var j=0; j<path.length; j++) {
            var xy = path.getAt(j);
            shapeCoords.push([xy.lng(), xy.lat()])
            if (j+1 >= path.length) {
              // First item must be the last item
              xy = path.getAt(0);
              shapeCoords.push([xy.lng(), xy.lat()])
            }
          }
          coords.push([shapeCoords]);
        }
        // Create MultiPolygon object and transform it to string
        return JSON.stringify({
            "type": "MultiPolygon",
            "coordinates": coords
        });
      }

      function listPoints () {
        /*
        Create a list of Points on the DOM using the shapes array
        */
        var $points = $('.points');

        for(var i=0; i<shapes.length; i++) {
          $('<h4>Polygon</h4>').appendTo($points);
          var $shape = $('<ul>'),
              shape = shapes[i],
              path = shape.getPath();
          $shape.appendTo($points);
          for (var j=0; j<path.length; j++) {
            var xy = path.getAt(j);
            $('<li>'+xy.lng()+', '+xy.lat()+'</li>').appendTo($shape);
          }
        }
      }

      function clearSelection() {
        if (selectedShape) {
          selectedShape.setEditable(false);
          selectedShape = null;
        }
      }

      function setSelection(shape) {
        /*
        Update shapes array when a shape is create or selected
        */
        clearSelection();
        selectedShape = shape;
        shape.setEditable(true);
        if (shapes.indexOf(shape) == -1) {
          shapes.push(shape);
        }
        // Print polygons on the DOM
        listPoints();
      }

      function initialize() {
        // Create Google Map map
        map = new google.maps.Map(document.getElementById('map_canvas'), {
          zoom: 10,
          center: new google.maps.LatLng(22.344, 114.048),
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true,
          zoomControl: true
        });

        var polyOptions = {
          strokeWeight: 0,
          fillOpacity: 0.45,
          editable: true
        };
        // Creates a drawing manager attached to the map that allows the user to draw shapes.
        drawingManager = new google.maps.drawing.DrawingManager({
          drawingMode: google.maps.drawing.OverlayType.POLYGON,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
              google.maps.drawing.OverlayType.POLYGON
            ]
          },
          polygonOptions: polyOptions,
          map: map
        });

        // Add an event listener for shape completed
        google.maps.event.addListener(drawingManager, 'overlaycomplete', function(e) {
           if (e.type != google.maps.drawing.OverlayType.MARKER) {

            // Add an event listener that selects the newly-drawn shape when the user
            // mouses down on it.
            var newShape = e.overlay;
            newShape.type = e.type;
            google.maps.event.addListener(newShape, 'click', function() {
              setSelection(newShape);
            });
            setSelection(newShape);
          }
        });

        // Clear the current selection when the drawing mode is changed, or when the
        // map is clicked.
        google.maps.event.addListener(map, 'click', clearSelection);

        // set submit events
        $('#form-area').submit(submitForm);
      }
      // Initialize map
      google.maps.event.addDomListener(window, 'load', initialize);

})();