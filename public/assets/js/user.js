(function () {
    var onUserPage = $('#alert-msgs');
    var globalMsg = sessionStorage.getItem('msg');
    sessionStorage.setItem('msg', null);
    $('#alert-msgs').hide();

    // If on the user profile page and tehre is an alert to show
    // then display that alert. The alert may be present when a
    // user successfully submits a curricula
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
})();