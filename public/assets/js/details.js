(function() {
  var id = $('#currId').attr('curTag');
  var votedStatus = false;
  var route = "";
  var user = '1';

  function makePost(route, id) {
    $.post(route, function(data) {
      window.location.href='/curricula/' + id;
    });
  }

  function formatToUnvote(){
    votedStatus = true;
    $('#vote').html('Unvote').addClass('btn-default').removeClass('btn-success');
  }
  
  function formatToVote(){
    votedStatus = false;
    $('#vote').html('Yay Curricula!').addClass('btn-success').removeClass('btn-default');
  }

  $('#vote').on('click', function(event){
    event.preventDefault();
    if (votedStatus && user) {
      route = '/api/unvote/' + id + '/' + user;
      formatToVote();
    } else if (user) {
      route = '/api/vote/' + id + '/' + user;
      formatToUnvote();
    } else {
      $('.alert-msg').html('You must be signed in to vote.')
    }
    makePost(route, id);
  });

  // Get the inital vote status on page load
  if (user) {
    $.get('/checkvote/' + user + '/' + id, function(data){
      votedStatus = data.status
      if (votedStatus === true) {
        formatToUnvote();
      } else if(votedStatus === false) {
        formatToVote();
      } else {
        $('.alert-msg').html('There was an error seeing your vote status.')
        return;
      }
      $('#vote').show();
    });
  }
})();