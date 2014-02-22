Viewport-Crop
=============

<a href="http://jamesfuthey.com/viewport-crop">VIEW DEMO</a>

Simple &amp; hassle-free image resize &amp; crop based on a pseudo-viewport. Touch-friendly via touch-punch.

No special requirements for use, by default it modifies the behaviour of each image tag it finds.

Usage:
=============

Image tags must have a specified width & height (This becomes the 'viewport').

Also requires jQuery, jQuery-ui, & Touch-Punch (Optional).

Ex.

	<!-- Your Images, with desired width & height specified -->
	
	<img height="300" width="750" src="1.jpg">
	<img height="120" width="500" src="2.jpg">
	<img height="500" width="750" src="3.jpg">
	
	<!--Somewhere else in your page include these -->
	
	<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
	<script src="http://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
	<script src="http://cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.2/jquery.ui.touch-punch.min.js"></script>
	<script src="http://jamesfuthey.com/viewport-crop/jquery.viewport-crop.js"></script>


=============

You will probably want to edit the jQuery selector before use. For example, you might want to create a special class for your "croppable" images:

Ex.

	$('img').each(function() -> $('.croppable').each(function()
  
Would take all of your images with the class "croppable" and apply this action.

To do:
=============

- Viewer / Editor classes
- Handle background-images
- Handle cases where the image already has a div masking it by detecting if parent() has overflow:hidden
