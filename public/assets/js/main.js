(function() {

    //alert("username = " + localStorage.getItem("author"));
    var author = localStorage.getItem("Author");
    var authorId = localStorage.getItem("id-Author");
    //var user = document.getElementById("#username").value;
    //console.log('name: ' + user);
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


    var obj = {};
    var countField = 0;

    function save() {
        var title = $('#curricula_name').val();
        var field1 = $('input[name=link0]').val();
        var desc = $('#curricula_description').text();
        var form = $("#create-form");
        var statusForm = $('input[name=status]').val();
        statusForm = true;


        if (title == '') {
            event.preventDefault();
            $('#curricula_name').attr("placeholder", "Title field id required!").addClass('alert-msg');
        } else {
            $('#curricula_name').attr("placeholder", "Title field id required!").removeClass('alert-msg');

        }


        if (!$('#curricula_description').val()) {
            $('#curricula_description').attr("placeholder", "Title field id required!").addClass('alert-msg');
        } else {
            $('#curricula_description').attr("placeholder", "Title field id required!").removeClass('alert-msg');

        }

        if (field1 == '') {
            event.preventDefault();
            $('input[name=link0]').attr("placeholder", "Step 1 link id required!").addClass('alert-msg')

            //$('#field-status').text('Please provide a field').addClass('alert-msg');
        } else {
            $('input[name=link0]').attr("placeholder", "Step 1 link id required!").removeClass('alert-msg');

            // $('#field-status').text('Published').addClass('save-msg');
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
                        step_content: descField,
                        authorId: authorId
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
                    'search_tags': $('#curricula_tag').val(),
                    'authorId': authorId
                },
                curriculaDetails: obj
            };
            // process the form
            $('#field-status').text('Published');

            $.ajax({
                type: 'POST',
                beforeSend: function() {
                    $('.loading').show();
                },
                url: '/api/posts',
                data: formDataCreate,
                complete: function() {
                    console.log('complete');

                },
                success: function(data) {

                    alert('yes!');
                    // $('.loading').hide();
                    console.log('sucess');
                }

            });
            $('.loading').delay(1000).fadeOut('slow');


        }


        // Stop form from submitting normally
        event.preventDefault();
    };
    //Call save function
    $("#save").on("click", save);


    //Lazy load function
    $(function() {
        $("div.lazy").lazyload();
    });

}());