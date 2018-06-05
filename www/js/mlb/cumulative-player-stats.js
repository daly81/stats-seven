function cumulativePlayerStats(player_id){
  $.ajax({
      type: "GET",
      url: 'https://api.mysportsfeeds.com/v1.2/pull/mlb/current/cumulative_player_stats.json',
      dataType: 'json',
      async: false,
      headers: {
        Authorization: "Basic " + btoa("idaly" + ":" + "IvD1803")
      },
      success: function (res){
        console.log(res);
        var players = res.cumulativeplayerstats.playerstatsentry;
        for (var i = 0; i < players.length; i ++){
          var cpsTeamName = res.cumulativeplayerstats.playerstatsentry[i].team.Name;
          var playerName = res.cumulativeplayerstats.playerstatsentry[i].player.FirstName;
          if(teamsName == cpsTeamName){
            console.log("player: " + playerName);
          }
        }
        console.log(cpsTeamName);
      }//success function
    });//ajax
}//cumulativePlayerStats
