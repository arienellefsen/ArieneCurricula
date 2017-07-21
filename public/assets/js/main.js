(function() {
    var count = 0;

    function addFields() {

        for (var i = 0; i < 5; i++) {
            var fieldLink = "<input type='text' name='link' placeholder='Add a link' class='link'><br > ",
                idLink = 'link' + count;
            var fields = $(fieldLink).attr("name", idLink).appendTo($("#fields-form"));
            count++;
        }
    };

    addFields();

    function publish() {
        $('input[name=status]').val('publish');
        $('#field-status').text('Published');
    };

    function save() {
        var title = $('#curricula_name').val();

        if (title == '') {
            event.preventDefault();
            $('#field-status').text('Please provide a title').addClass('alert-msg');
        } else {
            $('#field-status').text('Saved').addClass('save-msg');
            $('#save').text('Update');

            // there are many ways to get this data using jQuery (you can use the class or id also)
            var formDataCreate = {
                'curricula_name': $('#curricula_name').val(),
                'link0': $('input[name=link0]').val(),
                'link1': $('input[name=link1]').val(),
                'link2': $('input[name=link2]').val(),
                'link3': $('input[name=link3]').val(),
                'link4': $('input[name=link4]').val(),
                'status': $('input[name=status]').val()
            };
            // process the form
            $.ajax({
                type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
                url: '/api/posts', // the url where we want to POST
                data: formDataCreate, // our data object
                dataType: 'json', // what type of data do we expect back from the server
                encode: true
            }).done(function(data) {
                console.log("Data Saved: ");
                console.log(data.id);
                // log data to the console so we can see
                console.log(data);
                // here we will handle errors and validation messages
            });
        }
        // Stop form from submitting normally
        event.preventDefault();
    };

    function update() {
        var title = $('#curricula_name').val();

        if (title == '') {
            event.preventDefault();
            $('#field-status').text('Please provide a title').addClass('alert-msg');
        } else {
            $('#field-status').text('Saved').addClass('save-msg');
            $('#save').text('Update');

            // there are many ways to get this data using jQuery (you can use the class or id also)
            var formDataCreate = {
                'curricula_name': $('#curricula_name').val(),
                'link0': $('input[name=link0]').val(),
                'link1': $('input[name=link1]').val(),
                'link2': $('input[name=link2]').val(),
                'link3': $('input[name=link3]').val(),
                'link4': $('input[name=link4]').val(),
                'status': $('input[name=status]').val()
            };
            // process the form
            $.ajax({
                type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
                url: '/api/posts/{{this.id}}', // the url where we want to POST
                data: formDataCreate, // our data object
                dataType: 'json', // what type of data do we expect back from the server
                encode: true
            }).done(function(data) {
                console.log("Data Saved: ");
                console.log(data.id);
                // log data to the console so we can see
                console.log(data);
                // here we will handle errors and validation messages
            });
        }
        // Stop form from submitting normally
        event.preventDefault();
    };


    //Call save function
    $("#save").on("click", save);
    $("#publish").on("click", publish);
    $("#edit").on("click", update);

    $('#create-form').submit(function(event) {



        // stop the form from submitting the normal way and refreshing the page
    });

    //ajax call to submit form

}());