//gameid passed in from mlb_scoreboard.js
function getBoxscore(game_id){
  console.log("Game id: "+game_id);
  $.ajax({
    type: "GET",
    url: 'https://api.mysportsfeeds.com/v1.2/pull/mlb/current/game_boxscore.json?gameid='+game_id,
    dataType: 'json',
    async: false,
    headers: {
      Authorization: "Basic " + btoa("idaly" + ":" + "IvD1803")
    },
    error: function(res){
      console.log("ERROR "+ res);
    },
    // data: '{res}',
    success: function (res){
      var is = res.gameboxscore;
      console.log(is);
      var inningLen = res.gameboxscore.inningSummary.inning.length;
      var awayTeam = res.gameboxscore.game.awayTeam.Name;
      var homeTeam = res.gameboxscore.game.homeTeam.Name;

      var homeHits = res.gameboxscore.homeTeam.homeTeamStats.Hits["#text"];
      var awayHits = res.gameboxscore.awayTeam.awayTeamStats.Hits["#text"];
      var awayErrors = res.gameboxscore.awayTeam.awayTeamStats.Errors["#text"];
      var homeErrors = res.gameboxscore.homeTeam.homeTeamStats.Errors["#text"]
      for(var j=0; j<inningLen; j++){
        var innings = res.gameboxscore.inningSummary.inning[j]["@number"];
        var awayScore = res.gameboxscore.inningSummary.inning[j].awayScore;
        var homeScore = res.gameboxscore.inningSummary.inning[j].homeScore;



        // $('#innings').append('<td>'+innings+'</td>');
        // $('#homeTeam').html(homeTeam);
        // $('#homeScore').append('<td>'+homeScore+'</td>');
        // $('#awayTeam').html(awayTeam);
        // $('#awayScore').append('<td>'+awayScore+'</td>');
        //
        // $('#hth').html('<td>'+homeHits+'</td>')
        // $('#ath').html('<td>'+awayHits+'</td>')
        //
        // $('#homeErr').html('<td>'+homeErrors+'</td>')
        // $('#awayErr').html('<td>'+awayErrors+'</td>')
      }
    }
  });//ajax
}//boxscore function
