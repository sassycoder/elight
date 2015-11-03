/*
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
≡≡≡≡≡≡                                                                                                      ≡≡≡≡≡≡≡≡≡≡≡≡
≡≡≡≡≡≡   INITIALISE / BASE 1.0                                                                             ≡≡≡≡≡≡≡≡≡≡≡≡
≡≡≡≡≡≡                                                                                                    ≡≡≡≡≡≡≡≡≡≡≡≡
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
*/

'use strict';
$ = $ || jQuery;

$(function () {

  var body = $('body'),
      html = $('html');

  //remove touch delay on touch devices
  var attachFastClick = Origami.fastclick;
      attachFastClick(document.body);


  // get nav for hide/show
  var getNav = document.querySelector('.js-main-nav');
  // construct an instance of Headroom, passing the element and options
  var headroom  = new Headroom(getNav, {
    "tolerance": 5,
    "classes": {
      "initial": "animated",
      "pinned": "slideInDown",
      "unpinned": "slideOutUp"
    }
  });
  // initialise
  headroom.init();

  // Init gallery
  $('.js-carousel').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    swipe: false,
    autoplay: true,
    pauseOnHover: false,
    autoplaySpeed: 100000,
    infinite: true,
    speed: 500,
    fade: true,
    slide: 'figure',
    cssEase: 'linear'
  });

  //wrap highlighted text in <p> to align center
  // $('.someexample').textHighlight();

  // Widow handling
  // var paras = wt.fix({
  //       elements: 'p,span.highlight,span.caption,.heading,.standfirst,.film-info,.verdict,.article-link span,.words', //#main p:not(.highlight),span.highlight, div 
  //       chars: 12,
  //       method: 'nbsp',
  //       event: 'resize'
  //     });

  //Prevent click on image within single image gallery
  $('.gallery-thumb').on('click', function (e) {
    e.preventDefault();
  });

  //Insert duplicate letter for dropcap
  // $('.dropcap').each(function (i,d) {
  //     var t = $(this).text(),
  //         chr = t.substring(0,1);
  //     $(d).text(chr + t);
  //   });
  });

// $(window).load(function() {
//   $('.wrapper').css('height', $('.wrapper').height() + 'px');
// });
