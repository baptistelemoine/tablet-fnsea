(function($){

  window.addEventListener('load', function() {
    FastClick.attach(document.body);
  }, false);

   //Only one at a time is possible
  $('#handler-search').on('click', function(e){
    if($('#handler-combo:checked'))
      $('#handler-combo:checked').trigger('click');
  });
  $('#handler-combo').on('click', function(e){
    if($('#handler-search:checked'))
      $('#handler-search:checked').trigger('click');
  });

}(jQuery));