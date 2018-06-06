//gameid passed in from mlb_scoreboard.js
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
        } else{
          $('#homeTeamLineUp').append(
            '<li><a href="#">No expected lineup yet!</a></li>'
          );
        }
        for (var i=0; i<players; i ++){
          var check_a_expected = res.gamestartinglineup.teamLineup[0].expected.starter[i];
          if (check_a_expected !=null) {

            //away players
            var a_players_first = res.gamestartinglineup.teamLineup[0].expected.starter[i].player.FirstName;
            var a_players_last = res.gamestartinglineup.teamLineup[0].expected.starter[i].player.LastName;
            var a_players_num = res.gamestartinglineup.teamLineup[0].expected.starter[i].player.JerseyNumber;
            var a_players_pos = res.gamestartinglineup.teamLineup[0].expected.starter[i].player.Position;
            var a_first_init = a_players_first.charAt(0);
            //home players
            var h_players_first = res.gamestartinglineup.teamLineup[1].expected.starter[i].player.FirstName;
            var h_players_last = res.gamestartinglineup.teamLineup[1].expected.starter[i].player.LastName;
            var h_players_num = res.gamestartinglineup.teamLineup[1].expected.starter[i].player.JerseyNumber;
            var h_players_pos = res.gamestartinglineup.teamLineup[1].expected.starter[i].player.Position;
            var h_first_init = h_players_first.charAt(0);
          }
          var aname = a_first_init + '. ' + a_players_last;
          var hname = h_first_init + '. ' + h_players_last;

          //Title
          $('.unplayed-title').html(awayAbb+ ' @ '+homeAbb);

          //show hide the sections in unplayed
          $('#matchup_trig').click(function(){
            $('#matchup_trig').addClass('tab-link-active');
            $('#lineup_trig').removeClass('tab-link-active');
            $('#lineup').hide();
            $('#matchup').show();
          })
          $('#lineup_trig').click(function(){
            $('#matchup_trig').removeClass('tab-link-active');
            $('#lineup_trig').addClass('tab-link-active');
            $('#lineup').show();
            $('#matchup').hide();
          })

          //lineup sections
          $('#awayTeamLineUp').append(
            '<li>' +
              '<a class="item-content item-link" href="/about/">' +
                '<div class="item-media"><img class="player_img" src="img_avatar.png" alt="Avatar"></div>' +
                '<div class="item-inner">' +
                  '<div class="item-title">'+aname+'</div>' +
                  '<div class="item-title">'+a_players_pos+'</div>' +
                '</div>' +
              '</a>' +
            '</li>'
          );
          $('#homeTeamLineUp').append(
            '<li>' +
              '<a class="item-content item-link" href="/about/">' +
                '<div class="item-media"><img class="player_img" src="img_avatar.png" alt="Avatar"></div>' +
                '<div class="item-inner">' +
                  '<div class="item-title">'+hname+'</div>' +
                  '<div class="item-title">'+h_players_pos+'</div>' +
                '</div>' +
              '</a>' +
            '</li>'
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
