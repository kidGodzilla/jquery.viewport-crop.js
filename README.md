Viewport-Crop
=============

<a href="http://jsbin.com/xigebiqeyi/16/edit?output" target="_new">DEMO</a>

Simple &amp; hassle-free image resize &amp; crop based on a pseudo-viewport. Touch-friendly via touch-punch.

Requirements
=============
 - jQuery
 - jQuery UI
 - jQuery TouchPunch (optional, for touch-drag)

Usage
=============

Image tags must have a specified width & height (This becomes the 'viewport' or desired crop size).

To enable cropping, include all dependencies, then jquery.viewport-crop.js, then attach `viewportCrop()` to the images you wish to transform.

Example
=============

	<!-- Your Images, with desired width & height specified -->
	<img class="viewport-crop" height="300" width="750" src="1.jpg">
	<img class="viewport-crop" height="120" width="500" src="2.jpg">
	<img class="viewport-crop" height="500" width="750" src="3.jpg">
	
	<!-- Includes and binding -->
	<script src="//code.jquery.com/jquery-1.9.1.js"></script>
	<script src="//code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.2/jquery.ui.touch-punch.min.js"></script>
	<script src="jquery.viewport-crop.js"></script>
	<script>
	  $(document).ready(function () {
	    $('img.viewport-crop').viewportCrop();
	  });
	</script>

=============

To do:
=============

- Viewer for cropped images
- Add setup parameters for default offset and zoom on load
