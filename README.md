
servicearea
===========

Test for Mozio


Installation:
-------------

Install postgis:
https://docs.djangoproject.com/en/1.7/ref/contrib/gis/install/postgis/


troubleshooting:

Postgis installation:
http://stackoverflow.com/questions/4629796/issues-installing-postgis


To Do:
------

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
