(function() {
  var id = $('#currId').attr('curTag');
  var votedStatus = false;
  var route = "";

  // Posts the vote to the server and refresh the page
  function makePost(route, id) {
    $.post(route, function(data) {
      window.location.href='/curricula/' + id;
    });
  }

  // Formats the vote button to indicate that vote has already been done
  function formatToUnvote(){
    votedStatus = true;
    $('#vote').html('Unvote').addClass('btn-default').removeClass('btn-success');
  }
  
  // Formats the vote button to indicate that vote is possible
  function formatToVote(){
    votedStatus = false;
    $('#vote').html('Yay Curricula!').addClass('btn-success').removeClass('btn-default');
  }

  // When user clicks to vote determines which way to vote/unvote
  // The backend also performs check to prevent multiple posts to either
  // vote or unvote
  $('#vote').on('click', function(event){
    event.preventDefault();
    if (votedStatus) {
      route = '/api/unvote/' + id + '/1';
      formatToVote();
    } else {
      route = '/api/vote/' + id + '/1';
      formatToUnvote();
    } 
    makePost(route, id);
  });

  // Get the inital vote status on page load
  $.get('/checkvote/1/' + id, function(data){
    votedStatus = data.status
    if (votedStatus === true) {
      formatToUnvote();
    } else if(votedStatus === false) {
      formatToVote();
    } else {
      $('.alert-msg').html('Log-in to Vote')
      return;
    }
    $('#vote').show();
  });
})();