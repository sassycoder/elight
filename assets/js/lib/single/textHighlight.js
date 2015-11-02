(function($){
	'use strict';
	$.fn.textHighlight = function() {
		$.each(this, function(i,t) {
			var content = $(t).html();
			var output = '<span class="highlight">'+content+'</span>';
			$(t).addClass('wrap').html(output);
		});
	};
})(jQuery);