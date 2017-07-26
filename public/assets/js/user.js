$('input[type="text"]').each(function() {
    var id = $(this).attr('id');
    var value = $(this).val();
    localStorage.setItem(id, value);

});