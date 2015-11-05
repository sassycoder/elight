/* jshint unused: false */
/* globals MediaElementPlayer */

$(function () {
  'use strict';
   
  $('video').each(function () {
    var opt = {
      iPhoneUseNativeControls: false
    };
    $(this).mediaelementplayer(opt);
  });
});