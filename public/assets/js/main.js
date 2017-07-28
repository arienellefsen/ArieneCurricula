$('.scroll').jscroll();

(function() {


    //alert("username = " + localStorage.getItem("author"));
    var author = localStorage.getItem("Author");
    var authorId = localStorage.getItem("id-Author");
    var categories = {};
    //var user = document.getElementById("#username").value;
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
    var countField = 1;

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
                data: formDataCreate
            }).done(function(data){
                if(data === true){
                    sessionStorage.setItem('msg', "Success Uploading Curricula:\n" + $('#curricula_name').val() + "!");
                    window.location.href='/userview' 
                } else {
                    $('#resultsBox').html('Sorry there was an issue submitting.\nPlease try again later.')
                }
            }).fail(function( jqXHR, textStatus, errorThrown ) {
                $('.loading').delay(1000).fadeOut('slow');
                $('#resultsBox').html('Sorry there was an issue submitting.\nPlease try again later.');
                console.log(err);
            });

            $('.loading').delay(1000).fadeOut('slow');
        }

        // Stop form from submitting normally
        event.preventDefault();
    };

    //Call save function
    $("#save").on("click", save);



    function checkVisibility(card) {
        var $wt = $(window).scrollTop();    //* top of the window
        var $wb = $wt + $(window).height();  //* bottom of the window

        var ot = card.offset().top;  //* top of card (i.e. curicula card div)
        var ob = ot + card.height(); //* bottom of card

        if($wt<=ob && $wb >= ot){
         card.removeClass("curriculacardHidden");
        }

    }

    $(document).ready(function() {
       $(".curriculacardHidden").each(function(){
            checkVisibility($(this));
        });
    })

    $(window).scroll(function() {
       $(".curriculacardHidden").each(function(){
            checkVisibility($(this));
        });
    });

    // Populate sub-categories based on category selection
    $("#category-curricula").change(function(event) {
        event.preventDefault();
        $('#sub-category').empty();
        var cat = $("#category-curricula").val().trim();

        if (cat.length !== 0 && cat.toLowerCase() !== 'add new category') {
            categories[cat].forEach(function(subCat) {
                $('#sub-category').append(
                    "<option value='" + subCat + "'>" + subCat + "</option>"
                );
            });
        }
    });

    $.get('/api/cats', function(categoriesObject) {
        categories = categoriesObject;
    });

}());