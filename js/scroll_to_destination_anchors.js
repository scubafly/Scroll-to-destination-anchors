
/**
 * @file
 * Attaches the behaviors for the Scroll to Destination Anchors module.
 */

// Prevent script conflicts and attach the behavior.
(function($) {
  Drupal.behaviors.scrolltoanchors = {
    attach: function(context, settings) {
      // Wait until after the window has loaded.
      $(window).load(function(){
        // Utility to check if a string is a valid selector.
        function validateSelector(a) {
          return /^#[a-z]{1}[a-z0-9_-]*$/i.test(a);
        }

        // Utility to scroll users to particular destination on the page.
        function scrollToDestination(a, b) {
          if (a > b) {
            destination = b;
          } else {
            destination = a;
          }
          var movement = 'scroll mousedown DOMMouseScroll mousewheel keyup';
          $('html, body').animate({scrollTop: destination}, 500, 'swing').bind(movement, function(){
            $('html, body').stop();
          });
        }
        function interactionCallback(element, trigger, event) {
          // Store important values.
          var hrefValue = element.attr('href');
          var strippedHref = hrefValue.split('#')[1];
          var selector = '#' + strippedHref;
          var heightDifference = $(document).height() - $(window).height();

          // Make sure that the link value is a valid selector.
          if (validateSelector(selector)) {
            // Scroll users if there is an element with a corresponding id.
            if ($(selector).length > 0) {
              var linkOffset = $(trigger.hash).offset().top;
              scrollToDestination(linkOffset, heightDifference);
            }

            // Scroll users if there is a link with a corresponding name.
            else if ($('a[name=' + strippedHref + ']').length > 0) {
              var linkOffset = $('a[name=' + strippedHref + ']').offset().top;
              scrollToDestination(linkOffset, heightDifference);
            }

            // Add the href value to the URL.
            document.location.hash = strippedHref;

          }

          // Prevent the event's default behavior.
          event.preventDefault();
        }
        // When a user clicks on a link that starts with a hashtag.
        $('a[href^="#"]', context).click(function (event) {
            interactionCallback($(this), this, event);
        });
        // When a user clicks on a link that starts with a hashtag on the current path.
        $('a[href^="'+document.location.pathname+'#"', context).click(function (event) {
            interactionCallback($(this), this, event);
        });

      });

    }
  };
}(jQuery));
