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
    adaptiveHeight: true,
    arrows: false,
    swipe: true,
    autoplay: true,
    pauseOnHover: false,
    autoplaySpeed: 8000,
    infinite: true,
    speed: 500,
    fade: true,
    slide: 'figure',
    cssEase: 'linear'
  });

    // Init gallery
  $('.js-dots-carousel').slick({
    slidesToShow: 3,
    slidesToScroll: 3,
    adaptiveHeight: true,
    arrows: false,
    swipe: true,
    autoplay: true,
    pauseOnHover: false,
    autoplaySpeed: 8000,
    infinite: true,
    speed: 500,
    fade: false,
    dots: true,
    slide: 'figure',    
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          fade: true
        }
      }
    ]
  });

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

});
