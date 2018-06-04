function date(advance){
  var newDate = new Date();

  newDate.setDate(newDate.getDate() + advance);

  var month = newDate.getMonth()+1;
  var day = newDate.getDate();
  var todaysDate = newDate.getFullYear() +
  (month<10 ? '0' : '') + month +
  (day<10 ? '0' : '') + day;
  console.log(todaysDate);
  return todaysDate;
}
function get12(time){
  // Check correct time format and split into components
  time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) { // If time format correct
    time = time.slice (1);  // Remove full string match value
    time[5] = +time[0] <= 12 ? 'AM' : 'PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours

    time[1] = ":"+time[1];

  }
  return time.join(''); // return adjusted time or original string
}
//RULES
// st is used with numbers ending in 1 (e.g. 1st, pronounced first)
// nd is used with numbers ending in 2 (e.g. 92nd, pronounced ninety-second)
// rd is used with numbers ending in 3 (e.g. 33rd, pronounced thirty-third)
// As an exception to the above rules, all the "teen" numbers ending with 11, 12 or 13 use -th (e.g. 11th, pronounced eleventh, 112th, pronounced one hundred [and] twelfth)
// th is used for all other numbers (e.g. 9th, pronounced ninth).
function ordinal_suffix_of(num) {
    var j = num % 10,
        k = num % 100;
    if (j == 1 && k != 11) {
        return num + "st";
    }
    if (j == 2 && k != 12) {
        return num + "nd";
    }
    if (j == 3 && k != 13) {
        return num + "rd";
    }
    return num + "th";
}

var date = date(0);
$('document').ready(function(){
  var homeTeamName;
  var awayTeamName;
  var mystats = "https://api.mysportsfeeds.com/v1.2/pull/mlb/current/scoreboard.json?fordate="+date;
  $.ajax({
    type: "GET",
    url: mystats,
    dataType: 'json',
    async: false,
    headers: {
      Authorization: "Basic " + btoa("idaly" + ":" + "IvD1803")
    },
    error: function(res){
      console.log(res);
    },
    success: function (res){
      var gameLen = res.scoreboard.gameScore.length;
      var game = [];
      for(var i=0; i < gameLen; i++){
        var gameID = res.scoreboard.gameScore[i].game.ID;
        var completed = res.scoreboard.gameScore[i].isCompleted;
        var inProgress = res.scoreboard.gameScore[i].isInProgress;
        var unplayed = res.scoreboard.gameScore[i].isUnplayed;

        var homeTeamName = res.scoreboard.gameScore[i].game.homeTeam.Name;
        var awayTeamName = res.scoreboard.gameScore[i].game.awayTeam.Name;
        var homeScore = res.scoreboard.gameScore[i].homeScore;
        var awayScore = res.scoreboard.gameScore[i].awayScore;
        var currentInningHalf = res.scoreboard.gameScore[i].currentInningHalf;
        var gameTime = res.scoreboard.gameScore[i].game.time;

        var timeElements = gameTime.split(":");
        var hours = parseInt(timeElements[0]);
        var minutes = timeElements[1];
        var newHour;
        if (hours == 12){
          newHour = hours - 11;
        } else {
          newHour = hours + 1
        }
        var new12 = get12(newHour);
        var finalGameTime = new12+":"+minutes;

        if (inProgress=="true") {
          var outs = res.scoreboard.gameScore[i].playStatus.outCount;
          var currentInning = res.scoreboard.gameScore[i].inningSummary;
          if (currentInning !=null) {
              currentInning = res.scoreboard.gameScore[i].inningSummary.inning.length;
          } else {
            currentInning = "1"
          }

          var inning = ordinal_suffix_of(currentInning);

          var chevron_up = "arrow_drop_up";
          var chevron_down = "arrow_drop_down";
          if (currentInningHalf == "top"){
            var chevron = chevron_up;
          } else if(currentInningHalf == "bottom") {
            chevron = chevron_down;
          }
          $('#inProgress').append(
            '<a class="item-link gameid" id="'+gameID+'" href="/accordion/">' +
              '<div class="ip">' +
                '<div class="row">' +
                  '<div class="col-70">' + awayTeamName + '</div>' +
                  '<div class="col-5">' + awayScore + '</div>' +
                  '<div class="col-25"><i class="material-icons">'+chevron+'</i>'+ ' ' +inning+'</div>' +
                '</div>' +
                '<div class="row">' +
                  '<div class="col-70">' + homeTeamName + '</div>' +
                  '<div class="col-5">' + homeScore + '</div>' +
                  '<div class="col-25">'+outs+' Outs</div>' +
                '</div>' +
              '</div>' +
            '</a>'
          );
        };
        if (unplayed=="true"){
          $('#unplayed').append(
            '<a class="item-link startingLineUp" id="'+gameID+'" href="/lineup/">' +
              '<div class="ip">' +
                '<div class="row">' +
                  '<div class="col-70">' + awayTeamName + '</div>' +
                  '<div class="col-5">' + finalGameTime + '</div>' +
                  '<div class="col-25"></div>' +
                '</div>' +
                '<div class="row">' +
                  '<div class="col-70">' + homeTeamName + '</div>' +
                  '<div class="col-5"></div>' +
                  '<div class="col-25"></div>' +
                '</div>' +
              '</div>' +
            '</a>'
          )
        }

        if(completed=="true"){
          $('#completed').append(
            '<a class="item-link gameid" id="'+gameID+'" href="/accordion/">' +
              '<div class="ip">' +
                '<div class="row">' +
                  '<div class="col-70">' + awayTeamName + '</div>' +
                  '<div class="col-5">' + awayScore + '</div>' +
                  '<div class="col-25">Final</div>' +
                '</div>' +
                '<div class="row">' +
                  '<div class="col-70">' + homeTeamName + '</div>' +
                  '<div class="col-5">' + homeScore + '</div>' +
                  '<div class="col-25"></div>' +
                '</div>' +
              '</div>' +
            '</a>'
          )
        };
      }//for loop
    }//Success function
  });//ajax
  $('.gameid').click(function () {
    var selected_id = jQuery(this).attr("id");
    getBoxscore(selected_id);
  });
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
  }//getplaybyplay function
  // cumulativePlayerStats();

  $('.startingLineUp').click(function () {
    var game_id = jQuery(this).attr("id");
    startingLineUp(game_id);
  });
  function startingLineUp(game_id){
    $.ajax({
        type: "GET",
        url: 'https://api.mysportsfeeds.com/v1.2/pull/mlb/current/game_startinglineup.json?gameid='+game_id,
        dataType: 'json',
        async: false,
        headers: {
          Authorization: "Basic " + btoa("idaly" + ":" + "IvD1803")
        },
        success: function (res){
          console.log(res);
          var date = res.gamestartinglineup.game.date;
          var awayCity = res.gamestartinglineup.game.awayTeam.City;
          var homeCity = res.gamestartinglineup.game.homeTeam.City;
          var awayAbb = res.gamestartinglineup.game.awayTeam.Abbreviation;
          var homeAbb = res.gamestartinglineup.game.homeTeam.Abbreviation;
          var startingAway = res.gamestartinglineup.game.awayTeam.Name;
          var startingHome = res.gamestartinglineup.game.homeTeam.Name;
          var awayID = res.gamestartinglineup.game.awayTeam.ID;
          var homeID = res.gamestartinglineup.game.awayTeam.ID;

          //away lineup
          var players = res.gamestartinglineup.teamLineup[0].expected;
          if (players != null) {
            players = res.gamestartinglineup.teamLineup[0].expected.starter.length;
            // store.commit('setPlayers',  res.gamestartinglineup.teamLineup[0].expected);
          } else{
            $('#homeTeamLineUp').append(
              '<li><a href="#">No expected lineup yet! Check back soon</a></li>'
            );
          }
          for (var i=0; i<players; i ++){
            var check_a_expected = res.gamestartinglineup.teamLineup[0].expected.starter[i].player;
            if (check_a_expected !=null) {
              //away players
              var a_players_first = res.gamestartinglineup.teamLineup[0].expected.starter[i].player.FirstName;
              var a_players_last = res.gamestartinglineup.teamLineup[0].expected.starter[i].player.LastName;
              var a_players_num = res.gamestartinglineup.teamLineup[0].expected.starter[i].player.JerseyNumber;
              var a_players_pos = res.gamestartinglineup.teamLineup[0].expected.starter[i].player.Position;

              //home players
              var h_players_first = res.gamestartinglineup.teamLineup[1].expected.starter[i].player.FirstName;
              var h_players_last = res.gamestartinglineup.teamLineup[1].expected.starter[i].player.LastName;
              var h_players_num = res.gamestartinglineup.teamLineup[1].expected.starter[i].player.JerseyNumber;
              var h_players_pos = res.gamestartinglineup.teamLineup[1].expected.starter[i].player.Position;
            }
            var aname = a_players_first + ' ' + a_players_last;
            var hname = h_players_first + ' ' + h_players_last;

            $('#awayTeamLineUp').append(
              '<li><a href="#">'+aname+'</a></li>'
            );
            $('#homeTeamLineUp').append(
              '<li><a href="#">'+hname+'</a></li>'
            );

            $('#homeShow').html(
              startingHome
            )
            $('#awayShow').html(
              startingAway
            )

          }//for
        }//success function
      });//ajax
  }//startingLineUp
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
})//document ready function
