(function(){
  var checkOnEditPage = $('#editExists_curricula').attr('id') === 'editExists_curricula';
  var curriculaId = $('#editExists_curricula').attr('data-curric');
  sessionStorage.setItem('isEdit', checkOnEditPage);
  sessionStorage.setItem('editId', curriculaId);

  //Only runs if we are on the edit page.
  if (checkOnEditPage) {
    // This query will finish populating what handlebars didn't finish
    // due to the form steps populating dynamically
    $.get('/api/edit/' + curriculaId, function(detailsData) {
      $('#category-curricula').val(detailsData.cat);
      $('#sub-category').val(detailsData.subCat);
      detailsData.steps.forEach(function(step, i) {
        $('input[name=link' + i + ']').val(step.step_url);
        $('textarea[name=desclink' + i + ']').val(step.step_content);
      });
    });
  }
})();