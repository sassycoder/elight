/* jshint ignore:start */
    var tag = document.createElement('script');

    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    function onYouTubeIframeAPIReady() {
      $('.watch-trailer').each(function (i, el) {
        var getPlayer = $(el).find('.player').attr('id', 'player' + i);

            window['player' + i ] = new YT.Player('player'+i, {
              events: {
                'onStateChange': onPlayerStateChange,
                'onError': handleErrors
              }
            });
      });

      function onPlayerStateChange(event) {
        var btn = $(event.target.f).parent();

        if (event.data == YT.PlayerState.BUFFERING) {
          btn.addClass('ldng');
        }
        if (event.data == YT.PlayerState.PLAYING) {
          btn.removeClass('ldng');
        }
      }

      function handleErrors(event) {
        var btn = $(event.target.f).parent();
            btn.addClass('ldng');
        if (event.data == 5) {
            window.alert('There is an issue with this video. Please check your internet connection and try again later.');
            btn.removeClass('ldng');
        }
      }
    }

/* jshint ignore:end */