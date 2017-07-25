(function() {

    var count = 0;

    $('.loading').hide();

    function addFields() {

        for (var i = 0; i < 5; i++) {
            var fieldLink = "<input type='text' name='link' placeholder='Add a link' class='link'> ";
            var detailLink = "<textarea rows='4' cols='50' name='link-description' placeholder='Add link description' class='descritpion'></textarea>",
                idLink = 'link' + count;
            var fields = $(fieldLink).attr("name", idLink).appendTo($("#fields-form"));
            var description = $(detailLink).attr("name", 'desc' + idLink).appendTo($("#fields-form"));
            count++;
        }
    };

    addFields();

    function publish() {
        $('input[name=status]').val(true);
        $('#field-status').text('Published');

    };
    var obj = {};
    var countField = 0;

    function save() {
        var title = $('#curricula_name').val();
        var field1 = $('input[name=link0]').val();
        var form = $("#create-form");
        var statusForm = $('input[name=status]').val();
        statusForm = true;


        if (title == '') {
            event.preventDefault();
            $('#field-status').text('Please provide a title').addClass('alert-msg');
        }
        if (field1 == '') {
            event.preventDefault();
            $('#field-status').text('Please provide a field').addClass('alert-msg');
        } else {
            $('#field-status').text('Published').addClass('save-msg');
            $('#save').text('Update');

            for (var i = 0; i < 5; i++) {
                var fieldForm = $('input[name=link' + i + ']').val();
                var descField = $('textarea[name=desclink' + i + ']').val();
                //console.log(fieldForm);
                if (fieldForm != '') {
                    // obj['step1'].step_url = fieldForm;
                    //obj['step1'].step_url = 'link1';
                    obj['step' + countField] = {
                        step_url: fieldForm,
                        step_number: countField,
                        step_content: descField
                    };
                    countField++;
                }
            }

            // there are many ways to get this data using jQuery (you can use the class or id also)
            var formDataCreate = {
                curricula: {
                    'curricula_name': $('#curricula_name').val(),
                    'submited_status': statusForm,
                    'description': $('#curricula_description').val(),
                    'category': $('#category-curricula').val(),
                    'sub_category': $('#sub-category').val(),
                    'search_tags': $('#curricula_tag').val()
                },
                curriculaDetails: obj
            };
            // process the form

            $.ajax({
                type: 'POST',
                beforeSend: function() {
                    $('.loading').show();

                },
                url: '/api/posts',
                data: formDataCreate,
                success: function(data) {
                    // $('.loading').hide();


                }

            });
            $('.loading').delay(3000).fadeOut('slow');


        }


        // Stop form from submitting normally
        event.preventDefault();
    };
    //Call save function
    $("#save").on("click", save);
}());