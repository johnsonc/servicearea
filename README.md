# Service Area

Test for Mozio.

Goals:
 * demonstrate proficiency in Django, mysql, html, javascript
 * demonstrate basic use of AWS
 * work with google maps API (javascript and REST)
 * demonstarte that you can read API docs and learn on the fly
 * build something that could potentially be incorporated into Mozio


## Usage:

### See Prototype:
http://rafen.webfactional.com/

### Drawing Page:
On the drawing page ('/') the user can use Google Maps standard drawing tool to draw Polygons.
After doing that the user needs to specify a name for the Polygon created using the form at the bottom of the page.

### Find Page:
In the find page ('/find') the user can search all the "service areas" that cover a point. To do that the user needs to click on the map. A marker will be draw on the page, and all the areas that contains that point will be rendered on the map.


## Technology

### Django
Used as the main web framework,

### GeoDjango
Used for spatial queries, such us search all areas that contains a specific point.


### Django Rest Framework
All API endpoints are created with django_rest_framework. It provides an easy solid way to implement API.
It also has as self documented doc to instrospect all endpoints.


### Django Rest Framework GIS
This app is used to simplify the implementation of serializer in order to easy send and recived data to
Google Maps and other services.

### Twitter Bootstrap
Used as HTML, CSS, and JS framework to develop the templates of the front-end


## Implementation:

### Back-end:
The site was implmented on Django. It has two apps:
 * area: this app store all services area and serves the API implemented with django rest frame work. It also has a self documented page
 * clientarea: this app renders the pages of the web application. It also has the javascrips that handle the Map logic.

### Front-end:
The sites has two pages:
 * Draw: that has a custom vanilla javascript that handles the logic to add polygons on the draw.js file.
 * Find: contains a javascript called find.js with the logic to query the backend with a lat lng and renders the geojson object on the map.



## Installation:

#### Install postgis:
https://docs.djangoproject.com/en/1.7/ref/contrib/gis/install/postgis/

#### troubleshooting:
Postgis installation:
http://stackoverflow.com/questions/4629796/issues-installing-postgis


## To Do:

Back-end
 * Write tests for clientareas and areas apps
 * Add user authentication for API
 * In draw endpoint extend the creation method to update exiting areas instead of creating them
 * In draw endpoint extend the creation method to save the owner of the areas

Front-end
 * In draw view, show points in a list as soon as the user click on the map
 * In draw view improve "Clear" button to do no refresh the page
 * In draw view improve "List of Areas" to show more details about the object

Epics
 * Use a framework or MVC like angular
 * Use CoffeScript for easy code maintenance
 * Write tests :-)
