(function($){

  window.addEventListener('load', function() {
    FastClick.attach(document.body);
  }, false);

   //Only one at a time is possible
  $('#handler-filter').on('click', function(e){
    if($('#handler-combo:checked'))
      $('#handler-combo:checked').trigger('click');
  });
  $('#handler-combo').on('click', function(e){
    if($('#handler-filter:checked'))
      $('#handler-filter:checked').trigger('click');
  });

}(jQuery));