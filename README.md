Viewport-Crop
=============

Simple &amp; hassle-free image resize &amp; crop based on a pseudo-viewport. Touch-friendly via touch-punch.

Requires jQuery, jQuery-ui, & Touch-Punch (Optional).

No special requirements for use, by default it modifies the behaviour of each image tag it finds.

Image tags must have a specified width & height (This becomes the 'viewport').

Ex.
  <img height="300" width="750" src="http://jamesfuthey.com/phantombuilder.com/themes/spirito/assets/img/demo/bg_1.jpg">

=============

You will probably want to edit the jQuery selector before use. For example, you might want to create a special class for your "croppable" images:

Ex.
  $('img').each(function() -> $('.croppable').each(function()
  
Would take all of your images with the class "croppable" and apply this action.



=============

        <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
	      <script src="http://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
        <script src="http://cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.2/jquery.ui.touch-punch.min.js"></script>
	<script type="text/javascript">
            $('img').each(function() {
                $(this).attr('data-img-height', $(this).attr('height'));
                $(this).attr('data-img-width', $(this).attr('width'));
                $(this).removeAttr('height');
                $(this).removeAttr('width');

                $(this).wrap('<div style="height:'+$(this).attr("data-img-height")+'px;width:'+$(this).attr("data-img-width")+'px;overflow:hidden;position:relative;padding:0;margin:0;"></div>');
                $(this).parent().append('<div style="position:absolute;z-index:99999;"><input type="button" class="plus" value="+" style="position:absolute;height:32px;width:32px;left:0;" onclick="$(this).parent().siblings().first().css(\'width\', parseInt($(this).parent().siblings().first().width())*1.05+\'px\');$(this).parent().siblings().first().css(\'height\', parseInt($(this).parent().siblings().first().height())*1.05+\'px\');"> <input type="button" class="minus" value="-" style="position:absolute;height:32px;width:32px;left:32px;" onclick="$(this).parent().siblings().first().css(\'width\', parseInt($(this).parent().siblings().first().width())*0.95+\'px\');$(this).parent().siblings().first().css(\'height\', parseInt($(this).parent().siblings().first().height())*0.95+\'px\');"></div>');
                $(this).css("position", "absolute");
                $(this).css("padding", 0);
                $(this).css("margin", 0);
                $(this).css("top", -((parseInt($(this).css('height'))-parseInt($(this).attr("data-img-height")))/2)+"px");
                $(this).css("left", -((parseInt($(this).css('width'))-parseInt($(this).attr("data-img-width")))/2)+"px");
                console.log($(this).offset().top);
                    $(this).draggable({
                        revert: false,
                        revertDuration: 100,
                        drag: function(event, ui) {
                            if (parseInt($(this).offset().top) > 0)
                            {
                                $(this).draggable("option", "revert", true);
                            }
                            else if (parseInt($(this).offset().left) > 0)
                            {
                                $(this).draggable("option", "revert", true);
                            }
                            else if (parseInt($(this).offset().left) < parseInt($(this).parent().css('width'))-parseInt($(this).css('width')))
                            {
                                $(this).draggable("option", "revert", true);
                            }
                            else if (parseInt($(this).offset().top) < parseInt($(this).parent().css('width'))-parseInt($(this).css('width')))
                            {
                                $(this).draggable("option", "revert", true);
                            }
                            else
                            {
                                $(this).draggable("option", "revert", false);
                            }
                        }
                    });              
            });
        </script>
