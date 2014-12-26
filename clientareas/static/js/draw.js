(function(){
      var drawingManager;
      var selectedShape;
      var shapes = new Array();

      function submitForm(event) {
        // Manage submit form and some errors
        var $msg = $('.messages');
        $msg.empty();

        $.ajax({
          type: "POST",
          url: "/api/areas/",
          data: { name: $(this).find('#name').val(), poly: encodeMPoly()}
        }).success(function(){
          $msg.append($('<div class="alert alert-success">Area successfully saved!.</div>'));
        }).fail(function(data){
          if(data.status == 400){
            $msg.append($('<div class="alert alert-danger">Name field is required.</div>'));
          }else{
            $msg.append($('<div class="alert alert-danger">Create a valid area.</div>'));
          }
        });
        event.preventDefault();
      }

      function encodeMPoly () {
        // FIXME: replace this manual encoder by a library
        // I will use for now this because the time constrain of the test
        var str = "MULTIPOLYGON (";
        for(var i=0; i<shapes.length; i++) {
          var shape = shapes[i];
          var path = shape.getPath();
          str += "(("
          for (var j=0; j<path.length; j++) {
            var xy = path.getAt(j);
            str += xy.lng().toFixed(16) +" " + xy.lat().toFixed(16);
            // if loop is not over add a ','
            str += ", "
            if (j+1 >= path.length) {
              // First item must be the last item
              xy = path.getAt(0);
              str += xy.lng().toFixed(16) + " " + xy.lat().toFixed(16);
            }
          }
          str += "))"
          // if loop is not over add a ','
          if (i+1 < shapes.length) {
            str += ", "
          }
        }
        str += ")"
        return str
      }

      function clearSelection() {
        if (selectedShape) {
          selectedShape.setEditable(false);
          selectedShape = null;
        }
      }

      function setSelection(shape) {
        clearSelection();
        selectedShape = shape;
        shape.setEditable(true);
        window.shape = selectedShape;
        if (shapes.indexOf(shape) == -1) {
          shapes.push(shape);
        }
        // Print polygons on area
        $('#poly').val(encodeMPoly());
      }

      function deleteSelectedShape() {
        if (selectedShape) {
          selectedShape.setMap(null);
        }
      }

      function initialize() {
        var map = new google.maps.Map(document.getElementById('map_canvas'), {
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
        // Creates a drawing manager attached to the map that allows the user to draw
        // markers, lines, and shapes.
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

        google.maps.event.addListener(drawingManager, 'overlaycomplete', function(e) {
           if (e.type != google.maps.drawing.OverlayType.MARKER) {
            // Switch back to non-drawing mode after drawing a shape.
            drawingManager.setDrawingMode(null);

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
        google.maps.event.addListener(drawingManager, 'drawingmode_changed', clearSelection);
        google.maps.event.addListener(map, 'click', clearSelection);

        // set submit events
        $('#form-area').submit(submitForm);
      }
      google.maps.event.addDomListener(window, 'load', initialize);


})();