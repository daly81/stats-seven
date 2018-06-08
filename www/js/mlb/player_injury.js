function player_injuries(awayID, homeID){
  $.ajax({
    type: "GET",
    url: "https://api.mysportsfeeds.com/v1.2/pull/mlb/current/player_injuries.json",
    dataType: 'json',
    async: false,
    headers: {
      Authorization: "Basic " + btoa("idaly" + ":" + "IvD1803")
    },
    error: function(res){
      console.log(res);
    },
    success: function(res){
      console.log(res);
      var number_of_injuries = res.playerinjuries.playerentry.length;
      for (var i=0; i<number_of_injuries; i++){
        var playerID = res.playerinjuries.playerentry[i].player.ID;
        var team_id = res.playerinjuries.playerentry[i].team.ID;
        var playerPosition = res.playerinjuries.playerentry[i].player.Position
        var injured_player_first = res.playerinjuries.playerentry[i].player.FirstName;
        var injured_player_last = res.playerinjuries.playerentry[i].player.FirstName;
        var first_init = injured_player_first.charAt(0);
        if (team_id == awayID) {
          var name = first_init + '. ' + injured_player_last;
          //lineup sections
          $('#awayInjuries').append(
            '<li>' +
            '<a class="item-content item-link" href="/about/">' +
            '<div class="item-media"><img class="player_img" src="img_avatar.png" alt="Avatar"></div>' +
            '<div class="item-inner">' +
            '<div class="item-title">'+name+'</div>' +
            '<div class="item-title">'+playerPosition+'</div>' +
            '</div>' +
            '</a>' +
            '</li>'
          );
        }//if
        if (team_id == homeID) {
          $('#homeInjuries').append(
            '<li>' +
            '<a class="item-content item-link" href="/about/">' +
            '<div class="item-media"><img class="player_img" src="img_avatar.png" alt="Avatar"></div>' +
            '<div class="item-inner">' +
            '<div class="item-title">'+name+'</div>' +
            '<div class="item-title">'+playerPosition+'</div>' +
            '</div>' +
            '</a>' +
            '</li>'
          );
        }//if
      }//for loop
    }//success function
  })//ajax request
}//player_injuries
