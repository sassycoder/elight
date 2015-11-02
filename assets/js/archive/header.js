// (C) Dylan Knutson 2014
// https://github.com/dymk/ScrollNav

// Slightly modified by @beardedwarrior to hide/show header at specified Y position,
// and fade in/out using rAF

// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

(function($) {
  'use strict';

  $.fn.scrollNav = function(opts) {
    //fix bootstrap bug when navbar is fixed positioned
    if(opts) {
      if(opts.bootstrap_mobile) {
        $(document.body).append('<style type="text/css"> @media(max-width: 767px) { .navbar-fixed-top, .navbar-fixed-bottom, .navbar-static-top { margin-right: 0; margin-left: 0;} }</style>');
      }
    }

    var
      flag = true,
      window_scroll = $(window).scrollTop(),
      navbar = this,
      navbar_height = navbar.outerHeight(),
      scroll_last = window_scroll,
      navbar_visible = navbar_height,
      //caption = $('.main-content .component.caption'),
      vanishPoint = opts.vanishPoint ? opts.vanishPoint : 320,

      resize_handler = function() {
        navbar_height = navbar.height();
      },

      getCurScroll = function () {
        var ret;
        if (flag) {
          ret = window_scroll;
        }
        return ret;
      };

    $(window).resize(resize_handler);
    //bootstrap mobile compatibility
    this.find('.nav-collapse').on('shown', resize_handler);
    this.find('.nav-collapse').on('hidden', resize_handler);

    $(window).scroll(function() {
      //calculate how far the window was scrolled
      //scrolling up the page is a positive delta
      window_scroll = $(window).scrollTop();
      var
        scroll_delta = scroll_last - window_scroll,
        navbar_visible_new = navbar_visible + scroll_delta;


      if(scroll_delta < 0) {

        //scrolling down the page
        //caption.removeClass('scrollDown').addClass('scrollUp');
        if(window_scroll >= vanishPoint) {
          //navbar currently is totally visible, and has fixed positioning set
          //set to abs positioning so it begins to go out of frame
          navbar.css({'position': 'absolute', 'top': getCurScroll() + 'px'});
          flag = false;
        }
        //else:
        //navbar will be partially visible, let abs positioning move it
      }
      else if(scroll_delta > 0) {

        //caption.removeClass('scrollUp').addClass('scrollDown');
        if ((navbar_visible <= 0) && (window_scroll >= vanishPoint)) {
          
          //navbar was not visible, set abs positioning right above this
          navbar.css({'position': 'absolute', 'top': Math.max(window_scroll - navbar_height, 0) + 'px'});
          flag = true;
        }
        //scrolling up the page
        if(navbar_visible_new >= navbar_height) {
          //navbar will be 100% visible
          navbar.css({'position': 'fixed', 'top': '0px'});
        }
      }

      function getVisible() {
        var $el = $(navbar),
            elH = $el.outerHeight(),
            H   = $(window).height(),
            r   = $el[0].getBoundingClientRect(), t=r.top, b=r.bottom,
            pxVis = Math.max(0, t>0? Math.min(elH, H-t) : (b<H?b:H)),
            ret = ((pxVis) / navbar_height * 100) * 0.01;
            $(navbar).find('.inner').css('opacity', ret);
      }

      //recalculate the amount the navbar is visible
      navbar_visible = Math.min(Math.max(navbar_visible_new, 0), navbar_height);
      scroll_last = window_scroll;

      //change opacity of navbar
      window.requestAnimationFrame(getVisible);
    });
  };
})(jQuery);