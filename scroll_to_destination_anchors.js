(function($) {
Drupal.behaviors.scrolltoanchors = {
  attach: function(context, settings) {
    $(document).ready(function(){
      function validateSelector(a) {
        return a.indexOf('#') === 0;
      }
      function scrollToDestination(a, b) {
        if (a > b) {
          destination = b;
        } else {
          destination = a;
        }
        var movement = 'scroll mousedown DOMMouseScroll mousewheel keyup';
        $('html, body').animate({scrollTop: destination}, 800, 'swing').bind(movement, function(){
          $('html, body').stop();
        });
      }
      $('a[href^="#"]', context).click(function(event) {
        event.preventDefault();
        var hrefValue = $(this).attr('href');
        var strippedHref = hrefValue.replace('#','');
        var heightDifference = $(document).height() - $(window).height();
        if (validateSelector(hrefValue)) {
          if ($(hrefValue).length > 0) {
            var linkOffset = $(this.hash).offset().top;
            scrollToDestination(linkOffset, heightDifference);
          }
          else if ($('a[name=' + strippedHref + ']').length > 0) {
            var linkOffset = $('a[name=' + strippedHref + ']').offset().top;
            scrollToDestination(linkOffset, heightDifference);
          }
        }
      });
    });
  }
};
}(jQuery));
