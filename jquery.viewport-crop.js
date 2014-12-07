/*
 * jQuery viewport crop 0.3.2
 *
 * Copyright 2013-2014, James Futhey
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Creates a pseudo-viewport to contain images which can be dragged and zoomed,
 * resulting in a crop-like effect.
 *
 * The top and left offset of the image could then be returned using jQuery,
 * persisted, and the exact crop could be recreated without actually modifying
 * the image itself.
 *
 * Depends:
 *  jQuery.ui.draggable
 *  Touchpunch (optional, for touch support)
 */
(function ( $ ) {

    $.fn.viewportCrop = function() {

        // Resizes the image by a float value (e.g. 1.05, 0.95, 0.75)
        function zoomBy(value, who) {
            who.css('width',  parseInt(who.width())  * value + 'px');
            who.css('height', parseInt(who.height()) * value + 'px');
            rememberImageSize();
        }

        // Persists some metadata about the image to support other functionality
        function rememberImageSize() {
            lastWidth = img.width();
            lastHeight = img.height();
            lastTop = img.css('top').slice(0,-2);
            lastLeft = img.css('left').slice(0,-2);
        }

        // Logs errors warning of missing dependencies
        function checkDependencies() {
            if(typeof $.fn.draggable !== "function") {
                console.log('jQuery UI is required for viewportCrop to work.');
                return;
            }
        }

        // Constructs a pseudo-viewport wrapper
        function constructFromImage(image) {
            viewportHeight = parseInt(image.attr('height'));
            viewportWidth = parseInt(image.attr('width'));
            imgHeight = parseInt(image.css('height'));
            imgWidth = parseInt(image.css('width'));

            // If an offset is specified as an attribute, run with it
            topOffset = image.attr('data-top-offset')   || - ( (imgHeight - viewportHeight) / 2 );
            leftOffset = image.attr('data-left-offset') || - ( (imgWidth  - viewportWidth)  / 2 );

            // Remove the inline attribute
            image.removeAttr('height');
            image.removeAttr('width');

            // Pseudo-viewport wrapper
            image.wrap('<div style="height:'+viewportHeight+'px;width:'+viewportWidth+'px;overflow:hidden;position:relative;padding:0;margin:0;"></div>');

            // Zoom in / out buttons
            image.parent().append(
                  '<div style="position:absolute;z-index:9999;">'
                + '<svg enable-background="new 0 0 512 512" height="22px" version="1.1" viewBox="0 0 512 512" width="22px" fill="rgba(255,255,255,0.85)" style="padding:5px;position:absolute;left:0;margin:0;background:rgba(0,0,0,0.5);" class="viewport-crop-plus" onclick="" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M497.913,497.914c-18.782,18.781-49.226,18.781-68.008,0l-84.862-84.864c-34.89,22.366-76.131,35.718-120.66,35.718  C100.468,448.768,0,348.314,0,224.384C0,100.454,100.468,0,224.383,0c123.931,0,224.384,100.453,224.384,224.384  c0,44.529-13.353,85.771-35.718,120.675l84.863,84.849C516.695,448.689,516.695,479.131,497.913,497.914z M224.383,64.11  c-88.511,0-160.274,71.763-160.274,160.274c0,88.526,71.764,160.274,160.274,160.274c88.526,0,160.273-71.748,160.273-160.274  C384.656,135.873,312.909,64.11,224.383,64.11z M256.438,320.548h-64.108v-64.109H128.22V192.33h64.109v-64.11h64.108v64.11h64.11  v64.109h-64.11V320.548z"/></svg>'
                + '<svg enable-background="new 0 0 512 512" height="22px" version="1.1" viewBox="0 0 512 512" width="22px" fill="rgba(255,255,255,0.85)" style="padding:5px;position:absolute;left:32px;margin:0;background:rgba(0,0,0,0.5);" class="viewport-crop-minus" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><g><path d="M497.913,429.906l-84.863-84.848c22.365-34.903,35.718-76.146,35.718-120.676C448.768,100.453,348.314,0,224.383,0    C100.468,0,0,100.453,0,224.384s100.468,224.384,224.383,224.384c44.529,0,85.771-13.352,120.66-35.718l84.862,84.864    c18.782,18.781,49.226,18.781,68.008,0C516.695,479.131,516.695,448.689,497.913,429.906z M224.383,384.658    c-88.511,0-160.274-71.748-160.274-160.274c0-88.511,71.764-160.274,160.274-160.274c88.526,0,160.273,71.763,160.273,160.274    C384.656,312.91,312.909,384.658,224.383,384.658z M128.219,256.438h192.329v-64.109H128.219V256.438z"/></g></g></svg>'
                + '</div>'
            );

            // Attach zoom-in event
            image.siblings().children().filter('.viewport-crop-plus').click(function () {
                zoomBy(1.05, $(this).parent().siblings().first());
            });

            // Attach zoom-out event
            image.siblings().children().filter('.viewport-crop-minus').click(function () {
                zoomBy(0.95, $(this).parent().siblings().first());
            });

            // Modify the image's CSS
            image.css("position", "absolute");
            image.css("padding", 0);
            image.css("margin", 0);
            image.css("top", topOffset + "px");
            image.css("left", leftOffset + "px");
            image.css('cursor', 'move');
        }

        function attachEvents() {
            img.draggable({
                drag: function() {
                    var top = parseInt(img.offset().top);
                    var left = parseInt(img.offset().left);
                    var parentWidth = parseInt(img.parent().css('width'));
                    var parentHeight = parseInt(img.parent().css('width'));
                    var currentWidth = parseInt(img.css('width'));
                    var currentHeight = parseInt(img.css('height'));

                    // Revert the image if we leave the container
                    if (top > 0 || left > 0 || left < parentWidth - currentWidth || top < parentHeight - currentHeight) {
                        img.draggable("option", "revert", true);
                    }
                },
                revertDuration: 150 // Time to animate the image movement if we go out of bounds
            });
        }

        // Pinch-zoom using jQuery touchSwipe
        // Not enabled by default, overrides touch-drag
        function attachPinchZoomEvent() {
            if(typeof $.fn.swipe === "function" && 0) {
                img.swipe({
                    pinchIn:function() {
                        rememberImageSize();
                        //console.log(lastLeft);
                    },
                    pinchOut:function() {
                        rememberImageSize();
                    },
                    pinchStatus:function(event, phase, direction, distance , duration , fingerCount, pinchZoom) {
                        var growWidthBy = (lastWidth * pinchZoom) - lastWidth;
                        var growHeightBy = (lastHeight * pinchZoom) - lastHeight;

                        img.css('width', (lastWidth * pinchZoom) + "px");
                        img.css('height', (lastHeight * pinchZoom) + "px");
                        img.css('top', lastTop - growHeightBy / 2);
                        img.css('left', lastLeft - growWidthBy / 2);
                    },
                    fingers:2,
                    pinchThreshold:0
                });
            } else {
                console.log('Include jQuery touchSwipe for pinch zoom.');
            }
        }

        // Init
        var img = $(this), lastTop, lastLeft, lastWidth, lastHeight, viewportHeight, viewportWidth, imgHeight, imgWidth, topOffset, leftOffset;

        checkDependencies();
        constructFromImage(img);
        rememberImageSize();
        attachEvents();
        return this;
    };

}( jQuery ));
