(function($) {

Drupal.behaviors.scrolltoanchors = {
  attach: function(context, settings) {
    $(document).ready(function(){
      $('a[href^="#"]').click(function(event) {
        event.preventDefault();
        var destination = 0;
        if ( $(this.hash).offset().top > $(document).height() - $(window).height() ) {
          destination = $(document).height() - $(window).height();
        } else {
          destination = $(this.hash).offset().top;
        }
        $('html,body').animate({ scrollTop: destination }, 800, 'swing');
      });
    });
  }
};

}(jQuery));
