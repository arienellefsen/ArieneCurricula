var onUserPage = $('#alert-msgs');
var globalMsg = sessionStorage.getItem('msg');
sessionStorage.setItem('msg', null);

$('#alert-msgs').hide();
if(Object.keys(onUserPage).length !== 0 && globalMsg !== 'null') {
    $('#alert-msgs').html(globalMsg);
    globalMsg = null;
    $('#alert-msgs').show();
}

$('input[type="text"]').each(function() {
    var id = $(this).attr('id');
    var value = $(this).val();
    localStorage.setItem(id, value);
});
