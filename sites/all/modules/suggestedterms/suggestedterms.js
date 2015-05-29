if (Drupal.jsEnabled) {
  $(document).ready(suggestedterms_build_links);
}

function suggestedterms_build_links() {
  // get all attributes of span tag
  $('span.suggestedterm').each ( function() {
    var a = $('<a>' + this.innerHTML + '</a>')
    .attr('href', '#')
    .addClass($(this).attr('class'))
    .bind('click', function(event) {
      event.preventDefault();
      var input = $(this).parents(".form-item").children('input');
      var text = $(this).text();

      // add the string
      if (((', ' + input.val() + ',').indexOf(', ' + text + ',') < 0) && ((', ' + input.val() + ',').indexOf(', "' + text + '",') < 0)) {
        if ((input.val()).length > 0) {
          input.val(input.val() + ', ');
        }
        input.val(input.val() + text);
        $(this).addClass('remove');
      }

      // remove the string
      else {
        var field_text = input.val();
        var string_to_remove = $(this).text();

        // Remove term if it's the only term selected so far
        if (string_to_remove == field_text) {
          input.val('');
          $(this).removeClass('remove');
        } else {
          // Remove term if it's at the beggining or in the middle of a series comma separated terms
          if (field_text.indexOf(string_to_remove + ', ') > -1) {
            var replacement_text = field_text.replace(string_to_remove + ', ', '');
            input.val(replacement_text);
            $(this).removeClass('remove');
          }

          // Remove the string if it's at the end of the series of terms.
          else if (position = field_text.indexOf(', ' + string_to_remove)) {
            var length_of_field_text = field_text.length;
            var length_of_string_to_remove = string_to_remove.length;

            // This test ensures the last term in the series is not just a
            // substring of the term we want to remove.
            if ((position + 2 + length_of_string_to_remove) == length_of_field_text) {
              var replacement_text = field_text.replace(', ' + string_to_remove, '');
              input.val(replacement_text);
              $(this).removeClass('remove');
            }
          }
        }
      }
    }); // end bind
    $(this).before(a).remove();
  }); // end span.suggestedterm
} // end build_links
