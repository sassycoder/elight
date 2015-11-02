/*exported Hammer, refreshErrorMessages */

$(function () {
  'use strict';

  var navLinkUrl,
      $body = $('body'),

      handleNav = function () {
        toggleScrolling();
        $body.toggleClass('menu-open');
      },

      go = function () {
        window.location = navLinkUrl;
      },

      toggleScrolling = function () {
        if ($body.hasClass('menu-open')) {
          $body.unbind('touchmove');
        } else {
          $body.bind('touchmove', function(e){e.preventDefault();});
        }
      },

      delayMenuClose = function (delay) {
        window.setTimeout(handleNav, delay);
        window.setTimeout(go, (delay + 100));
      },

      doHbBtn = function (e) {
        $('.menu .nav-link').removeClass('active');
        handleNav();
        e.originalEvent.preventDefault();
      },

      doNavCloseBtn = function (e) {
        if ($body.hasClass('menu-open')) {
          handleNav();
        }
        e.preventDefault();
      },

      doNavClick = function (e) {
        var $this = $(this);
        
        navLinkUrl = $this.attr('href');
        $this.addClass('active');
        delayMenuClose(300);

        e.stopPropagation();
      };

  $('header .hb').on('click', doHbBtn);
  $('.menu .close').on('click', doNavCloseBtn);
  $('.loading').on('click', doNavCloseBtn);
  $('.nav-link').on('touchstart', doNavClick);
});