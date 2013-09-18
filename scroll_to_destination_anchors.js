(function($) {

Drupal.behaviors.scrolltoanchors = {
  attach: function(context, settings) {
    function validate(a) {
      return /^#[a-z]{1}[a-z0-9_-]*$/i.test(a);
    }
    function scroll(a,b) {
      if (a > b) {
        destination = b;
      } else {
        destination = a;
      }
      $('html,body').animate({ scrollTop: destination }, 800, 'swing');
    }
    $(document).ready(function(){
      $('a[href^="#"]').click(function(event) {
        event.preventDefault();
        var href_value = $(this).attr('href');
        var window_height = $(window).height();
        var document_height = $(document).height();
        var height_difference = document_height - window_height;
        if (validate(href_value)) {
          if ($(href_value).length > 0) {
            var link_offset = $(this.hash).offset().top;
            scroll(link_offset, height_difference);
          }
          else if ($('a[name=' + href_value + ']')) {
            var href_value = href_value.replace('#','');
            var link_offset = $('a[name=' + href_value + ']').offset().top;
            scroll(link_offset, height_difference);
          }
        }

      });
    });
  }
};

}(jQuery));
