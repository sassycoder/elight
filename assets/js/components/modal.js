/*exported initPhotoSwipeFromDOM, refreshErrorMessages */

var initPhotoSwipeFromDOM = function(gallerySelector) {
    'use strict';

    var hsCount,
        isHotSpot;

    // parse slide data (url, title, size ...) from DOM elements 
    // (children of gallerySelector)
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

        for(var i = 0; i < numNodes; i++) {

            figureEl = thumbElements[i]; // <figure> element

            // include only element nodes 
            if(figureEl.nodeType !== 1) {
                continue;
            }

            linkEl = figureEl.children[0]; // <a> element

            size = linkEl.getAttribute('data-size').split('x');

            // create slide object
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10),
                bgColor: $(linkEl).css('background-color')
            };

            if(figureEl.children.length > 1) {
                // <figcaption> content
                item.title = figureEl.children[1].innerHTML;
            }

            if(isHotSpot) {
                // <figcaption> hotspot content
                item.hotspots = $(figureEl).find('.cqtooltip-wrapper')[0].outerHTML;
            }

            if(linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            }

            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }

        return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        // find root element of slide
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });

        if(!clickedListItem) {
            return;
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

            //find out if this is a hotspot component
            isHotSpot = $(clickedGallery).hasClass('hotspot');

        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) {
                continue;
            }

            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }



        if(index >= 0) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};

        if(hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');
            if(pair.length < 2) {
                continue;
            }
            params[pair[0]] = pair[1];
        }

        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items,
            bgCol = [],
            firstTime = true;

        items = parseThumbnailElements(galleryElement);
        // define options (if needed)
        options = {

            history: false,
            closeOnVerticalDrag: false,
            showHideOpacity: true,
            zoomEl: true,
            shareEl: false,
            fullscreenEl: false,
            allowPanToNext: false,
            preload: [1,3],
            tapToToggleControls: isHotSpot ? false : true
        };

        // PhotoSwipe opened from URL
        if(fromURL) {
            if(options.galleryPIDs) {
                // parse real index when custom PIDs are used 
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                // in URL indexes start from 1
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if( isNaN(options.index) ) {
            return;
        }

        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }

        function moveHeading () {
          var counter = $('.pswp--open').find('.pswp__counter')[0].innerHTML.replace(/ /g,''),
              cap = $('.pswp--open').find('.pswp__caption__center');

          $('.wrapper-caption')
            .html('<div class="pswp__counter">' + counter + '</div>' + cap[cap.length - 1].innerHTML);
        }

        function calcZoom () {
          return gallery.items[0].w / (gallery.getZoomLevel()*gallery.items[0].w);
        }

        function updateZoom () {
          $('.pswp__zoom-wrap .hotspot-item').css({
            '-webkit-transform' : 'translate3d(0, 0, 0) scale(' + calcZoom() + ')',
            'transform' : 'translate3d(0, 0, 0) scale(' + calcZoom() + ')'
          });
        }

        function initHotSpot () {
          var hs = $('.pswp--open').find('.pswp__zoom-wrap')[0];
              $(hs).html(gallery.items[0].hotspots);
              $(hs).find('.cqtooltip-wrapper').css({
                width: gallery.items[0].w + 'px',
                height: gallery.items[0].h + 'px'
              });
              hsCount = $('.pswp__zoom-wrap .hotspot-item').length;
              $('.pswp__counter')
              .html('1/' + hsCount)
              .append($('.pswp__zoom-wrap .cq-tooltip').eq(0).data('tooltip'));

              $('.pswp__zoom-wrap .hotspot-item').css({
                '-webkit-transform' : 'translate3d(0, 0, 0) scale(' + calcZoom() + ')',
                'transform' : 'translate3d(0, 0, 0) scale(' + calcZoom() + ')'
              }).eq(0).find('.cq-tooltip').addClass('active');

              changeBg(gallery.getCurrentIndex());

          $('.pswp__zoom-wrap .cq-tooltip').on('click', function (e) {
            var $this = $(this),
                index = $this.find('i').text(),
                content = $this.data('tooltip');

            $('.pswp__counter')
            .html(index + '/' + hsCount)
            .append(content);

            $('.pswp__zoom-wrap .cq-tooltip').removeClass('active');
            $this.addClass('active');
            e.preventDefault();
          });

          $('.pswp__zoom-wrap').attrchange({
            trackValues: false,
            callback: function () {
                window.requestAnimationFrame(updateZoom);
            }
          });
        }

        function pauseGallery () {
          $('.carousel').slick('slickPause');
        }

        function playGallery () {
          $('.carousel').slick('slickPlay');
        }

        function changeBg (index) {
            var whichImg;
            isHotSpot ? whichImg = '.cqtooltip-wrapper img' : '.pswp__img';
          $(whichImg).css('background-color', bgCol[index]);
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);

        gallery.listen('afterChange', function() {
            moveHeading();
            changeBg(gallery.getCurrentIndex());
        });

        gallery.listen('gettingData', function() {
          if (firstTime) {
            for(var i = 0, l = gallery.items.length; i < l; i++) {
              bgCol.push(gallery.items[i].bgColor);
            }
            firstTime = false;
          }
        });

        gallery.listen('destroy', function() {
            playGallery();
        });
        
        gallery.init();
        moveHeading();
        pauseGallery();

        if (isHotSpot) {
          initHotSpot();
        }
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll( gallerySelector );

    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
};

// execute above function
initPhotoSwipeFromDOM('.js-modal');