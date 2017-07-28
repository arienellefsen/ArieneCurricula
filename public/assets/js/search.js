(function() {
  $('#searchBtn').on('click', function(event) {
    getSearch();
  });

  $('#searchBar').on('keypress', function(event) {
    if (event.keyCode === 13) {
      getSearch();
    } 
  });

  function getSearch() {
    var searchBarVal = $('#searchBar').val().trim().toLowerCase();
    if (searchBarVal.length > 0) {
      window.location.href='/search?q=' + searchBarVal;
    }
  }
})();
