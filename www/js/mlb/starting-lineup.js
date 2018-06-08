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
        var awayID = res.gamestartinglineup.teamLineup[0].team.ID;
        var homeID = res.gamestartinglineup.teamLineup[1].team.ID;
        //player injuries
        player_injuries(awayID, homeID);

        //away lineup
        var players = res.gamestartinglineup.teamLineup[0].expected;
        if (players != null) {
          players = res.gamestartinglineup.teamLineup[0].expected.starter.length;
          //Positions
          var _1b = "1B";
          var _2b = "2B";
          var _3b = "3B";
          var p = "P";
          var cf = "CF";
          var ss = "SS";
          var rf = "RF";
          var lf = "LF";
          var c = "C";
        } else{
          $('#homeTeamLineUp,#awayTeamLineUp',).append(
            '<li><a href="#">No expected lineup yet!</a></li>'
          );
        }//else players null
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

        var aPosArr = [];
        var hPosArr = []
        for (var j=0; j<players; j++){
          //===============away loop=================================================
          var check_a_expected = res.gamestartinglineup.teamLineup[0].expected.starter[j];
          var check_a_staters = res.gamestartinglineup.teamLineup[0].expected.starter[j].player;
          if (check_a_expected !=null) {
            if (check_a_staters != null) {
              var afn = res.gamestartinglineup.teamLineup[0].expected.starter[j].player.FirstName;
              var aln = res.gamestartinglineup.teamLineup[0].expected.starter[j].player.LastName;
              var ap = res.gamestartinglineup.teamLineup[0].expected.starter[j].position;
              var away_id = res.gamestartinglineup.teamLineup[0].expected.starter[j].player.ID;
              var aplayerinfo = {
                'firstName' : afn,
                'lastName' : aln,
                'position' : ap,
                'id' : away_id
              }
            }
          }
          //away exepected staters
          var away_player_positions = res.gamestartinglineup.teamLineup[0].expected.starter[j].position;
          switch(away_player_positions) {
              case _1b:
                  aPosArr.push(aplayerinfo)
                  break;
              case _2b:
                  aPosArr.push(aplayerinfo)
                  break;
              case _3b:
                  aPosArr.push(aplayerinfo)
                  break;
              case p:
                  aPosArr.push(aplayerinfo)
                  break;
              case cf:
                  aPosArr.push(aplayerinfo)
                  break;
              case ss:
                  aPosArr.push(aplayerinfo)
                  break;
              case rf:
                  aPosArr.push(aplayerinfo)
                  break;
              case lf:
                  aPosArr.push(aplayerinfo)
                  break;
              case c:
                  aPosArr.push(aplayerinfo)
                  break;
              default:
                  // code block
          }// away switch

          //===============home loop=================================================
          var check_h_expected = res.gamestartinglineup.teamLineup[1].expected.starter[j];
          var check_h_staters = res.gamestartinglineup.teamLineup[1].expected.starter[j].player;
          if (check_h_expected !=null) {
            if (check_h_staters != null) {
              var hfn = res.gamestartinglineup.teamLineup[1].expected.starter[j].player.FirstName;
              var hln = res.gamestartinglineup.teamLineup[1].expected.starter[j].player.LastName;
              var hp = res.gamestartinglineup.teamLineup[1].expected.starter[j].position;
              var home_id = res.gamestartinglineup.teamLineup[1].expected.starter[j].player.ID;
              var hplayerinfo = {
                'firstName' : hfn,
                'lastName' : hln,
                'position' : hp,
                'id' : home_id
              }
            }
          }
          //home expected staters
          var home_player_positions = res.gamestartinglineup.teamLineup[1].expected.starter[j].position;
          switch(home_player_positions) {
              case _1b:
                  hPosArr.push(hplayerinfo)
                  break;
              case _2b:
                  hPosArr.push(hplayerinfo)
                  break;
              case _3b:
                  hPosArr.push(hplayerinfo)
                  break;
              case p:
                  hPosArr.push(hplayerinfo)
                  break;
              case cf:
                  hPosArr.push(hplayerinfo)
                  break;
              case ss:
                  hPosArr.push(hplayerinfo)
                  break;
              case rf:
                  hPosArr.push(hplayerinfo)
                  break;
              case lf:
                  hPosArr.push(hplayerinfo)
                  break;
              case c:
                  hPosArr.push(hplayerinfo)
                  break;
              default:
                  // code block
          }// away switch
        }// for players length
        var len = aPosArr.length;
        for (var i=0; i<len; i ++){
          //away players
          var a_players_first = aPosArr[i].firstName;
          var a_players_last = aPosArr[i].lastName;
          var a_players_pos = aPosArr[i].position;
          var a_first_init = a_players_first.charAt(0);
          //home players
          var h_players_first = hPosArr[i].firstName;
          var h_players_last = hPosArr[i].lastName;
          var h_players_pos = hPosArr[i].position;
          var h_first_init = h_players_first.charAt(0);

          var aname = a_first_init + '. ' + a_players_last;
          var hname = h_first_init + '. ' + h_players_last;


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
        }//for
        //Title
        $('.unplayed-title').html(awayAbb+ ' @ '+homeAbb);
        $('#homeShow').html(
          startingHome
        )
        $('#awayShow').html(
          startingAway
        )
      }//success function
    });//ajax

}//startingLineUp
