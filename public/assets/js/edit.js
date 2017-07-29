(function(){
  function editModePulls() {
    var checkOnEditPage = $('#editExists_curricula').attr('id') === 'editExists_curricula';
    var curriculaId = $('#editExists_curricula').attr('data-curric');
    var catExists = $("#category-curricula").attr('id');
    var categories = {};
    var catKeys = [];

    sessionStorage.setItem('isEdit', checkOnEditPage);
    sessionStorage.setItem('editId', curriculaId);

    // Function accepts a dropdown id selector and an array
    // function will iterate the array and add items to the dropdown
    function populateDropDown(dropDownName, arrOfVals){
        arrOfVals.forEach(function(item) {
            $(dropDownName).append(
                "<option value='" + item + "'>" + item + "</option>"
            );
        });
    }
    
    // Populate sub-categories based on category selection
    $("#category-curricula").change(function(event) {
        event.preventDefault();
        $('#sub-category').empty();
        var cat = $("#category-curricula").val().trim();

        if (cat.length !== 0 && cat.toLowerCase() !== 'add new category') {
            populateDropDown('#sub-category', categories[cat]);
        }
    });

    // If user on a page with category then populate the category dropdowns
    if (catExists !== undefined) {
        $.get('/api/cats', function(categoriesObject) {
            categories = categoriesObject;
            catKeys = Object.keys(categories);
            populateDropDown('#category-curricula', catKeys);
            populateDropDown('#sub-category', categories[catKeys[0]]);

            //Only runs if we are on the edit page.
            if (checkOnEditPage) {
                // This query will finish populating what handlebars didn't finish
                // due to the form steps populating dynamically
                $.get('/api/edit/' + curriculaId, function(detailsData) {
                    populateDropDown('#sub-category', categories[detailsData.cat]);
                    $('#category-curricula').val(detailsData.cat);
                    $('#sub-category').val(detailsData.subCat);
                    detailsData.steps.forEach(function(step, i) {
                        $('input[name=link' + i + ']').val(step.step_url);
                        $('textarea[name=desclink' + i + ']').val(step.step_content);
                    });
                });
            }
        });
    }
  }
  $(document).ready(editModePulls());
})();

