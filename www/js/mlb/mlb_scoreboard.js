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
        var homeAbb = res.scoreboard.gameScore[i].game.homeTeam.Abbreviation;
        var awayAbb = res.scoreboard.gameScore[i].game.awayTeam.Abbreviation;
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
                  '<div class="col-10"><img class="team_logo" src="img_avatar.png" alt="Logo"></div>' +
                  '<div class="col-60">' + awayTeamName + '</div>' +
                  '<div class="col-5">' + awayScore + '</div>' +
                  '<div class="col-25"><i class="material-icons">'+chevron+'</i>'+ ' ' +inning+'</div>' +
                '</div>' +
                '<div class="row">' +
                  '<div class="col-10"><img class="team_logo" src="img_avatar.png" alt="Logo"></div>' +
                  '<div class="col-60">' + homeTeamName + '</div>' +
                  '<div class="col-5">' + homeScore + '</div>' +
                  '<div class="col-25">'+outs+' Outs</div>' +
                '</div>' +
              '</div>' +
            '</a>'
          );
        };
        if (unplayed=="true"){
          $('#unplayed').append(
            '<a class="item-link startingLineUp" id="'+gameID+'" href="/unplayed/">' +
              '<div class="ip">' +
                '<div class="row">' +
                  '<div class="col-10"><img class="team_logo" src="img_avatar.png" alt="Logo"></div>' +
                  '<div class="col-60">' + awayTeamName + '</div>' +
                  '<div class="col-5">' + finalGameTime + '</div>' +
                  '<div class="col-25"></div>' +
                '</div>' +
                '<div class="row">' +
                  '<div class="col-10"><img class="team_logo" src="img_avatar.png" alt="Logo"></div>' +
                  '<div class="col-60">' + homeTeamName + '</div>' +
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
                  '<div class="col-10"><img class="team_logo" src="img_avatar.png" alt="Logo"></div>' +
                  '<div class="col-60">' + awayTeamName + '</div>' +
                  '<div class="col-5">' + awayScore + '</div>' +
                  '<div class="col-25">Final</div>' +
                '</div>' +
                '<div class="row">' +
                  '<div class="col-10"><img class="team_logo" src="img_avatar.png" alt="Logo"></div>' +
                  '<div class="col-60">' + homeTeamName + '</div>' +
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


  //=====================================Events=======================================
  //boxscore trigger
  $('.gameid').click(function () {
    var selected_id = jQuery(this).attr("id");
    getBoxscore(selected_id);
  });
  //starting lineup trigger
  $('.startingLineUp').click(function () {
    var game_id = jQuery(this).attr("id");
    startingLineUp(game_id);
  });
  //============================================================================

})//document ready function
