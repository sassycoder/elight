$(function () {
  'use strict';

  var $galleryEl = $('.single-image-modal'),
      $pic,
      allItems = [],
      $index,
      bgCol = [];

  $galleryEl.each( function() {

    $pic = $(this);
    $pic.find('a').each(function() {
        var $href    = $(this).attr('href'),
            $bg      = $(this).css('background-color'),
            $size    = $(this).data('size').split('x'),
            $width   = $size[0],
            $height  = $size[1],
            $caption = $(this).next('figcaption').html(),
            el       = this; // for getThumbBoundsFn

        var item = {
            src   : $href,
            w     : $width,
            h     : $height,
            title : $caption,
            el    : el,
            bgColor: $bg
        };

        allItems.push(item);
    });
  });

  var $pswp = $('.pswp')[0];
  $('.single-image-modal').on('click', 'figure', function(event) {
      event.preventDefault();
       
      $index = $galleryEl.index($(this).closest('.single-image-modal'));
          var options = {
            history: false,
            // getThumbBoundsFn: function(index) {
            //     // See Options -> getThumbBoundsFn section of documentation for more info
            //     var thumbnail = allItems[index].el.getElementsByTagName('img')[0], // find thumbnail
            //         pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
            //         rect = thumbnail.getBoundingClientRect();

            //     return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            // },
            closeOnVerticalDrag: false,
            //showAnimationDuration: 0,
            //hideAnimationDuration: 0,
            showHideOpacity: true,
            zoomEl: true,
            shareEl: false,
            fullscreenEl: false,
            allowPanToNext: false,
            preload: [1,3],
            index: $index
        },
        firstTime = true;

      function moveHeading () {
        var counter = $('.pswp--open').find('.pswp__counter')[0].innerHTML.replace(/ /g,''),
            cap = $('.pswp--open').find('.pswp__caption__center');

        $('.wrapper-caption')
          .html('<div class="pswp__counter">' + counter + '</div>' + cap[cap.length - 1].innerHTML);
      }

      function pauseGallery () {
        $('.carousel').slick('slickPause');
      }

      function playGallery () {
        $('.carousel').slick('slickPlay');
      }
      function changeBg (index) {
        $('.pswp__img').css('background-color', bgCol[index]);
      }
       
      // Initialize PhotoSwipe
      var singleImageModal = new PhotoSwipe($pswp, PhotoSwipeUI_Default, allItems, options);

      singleImageModal.listen('afterChange', function() {
        moveHeading();
        changeBg(singleImageModal.getCurrentIndex());
      });

      singleImageModal.listen('gettingData', function() {
        if (firstTime) {
            for(var i = 0, l = singleImageModal.items.length; i < l; i++) {
              bgCol.push(singleImageModal.items[i].bgColor);
            }
            firstTime = false;
          }
      });

      singleImageModal.listen('destroy', function() {
        playGallery();
      });

      singleImageModal.init();
      moveHeading();
      pauseGallery();

  });


});