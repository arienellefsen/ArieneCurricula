(function() {
    var count = 0;

    function addFields() {
        var btnremove = $('<input />', {
            type: 'button',
            value: 'Remove Link',
            class: 'remove',
            id: 'remove-link',
            on: {
                click: function() {
                    $(this).prev().remove();
                    $(this).remove();

                }
            }
        });
        for (var i = 0; i < 5; i++) {
            var fieldLink = "<input type='text' name='link' placeholder='Add a link' class='link'><i class='fa fa-times' aria-hidden= 'true'></i><br > ",
                idLink = 'add-link-id' + count;
            $(fieldLink).attr("id", idLink).appendTo($("#fields-form"));
            $(btnremove).appendTo($('#fields-form'));
            count++;
        }
    };
    addFields();
}());