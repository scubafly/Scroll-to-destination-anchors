(function($) {
	Drupal.behaviors.scrolltoanchors = {
		attach: function(context, settings) {
			
			// when the document is ready
			$(document).ready(function(){

				// select links that start with a hash tag
				$('a[href^="#"]').click(function(event) {

					// prevent default behavior
					event.preventDefault();

					// declare destination variable	
					var destination = 0;

					// if the link is down the page
					if ( $(this.hash).offset().top > $(document).height() - $(window).height() ) {

						// set destination to distance from the top of the window
						destination = $(document).height() - $(window).height();

					// if the link is not down the page
					} else {

						// set the destination to the top of the page
						destination = $(this.hash).offset().top;

					}

					// scroll to destination
					$('html,body').animate({ scrollTop: destination }, 800, 'swing');

				});
				
			});
			
		}
	};
}(jQuery));
