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
        }//else players null

        //firstbase
        var a_1b = res.gamestartinglineup.teamLineup[0].expected.starter[18].position;
        //secondbase
        var a_2b = res.gamestartinglineup.teamLineup[0].expected.starter[16].position;
        //thirdbase
        var a_3b = res.gamestartinglineup.teamLineup[0].expected.starter[5].position;
        //pitch
        var a_p = res.gamestartinglineup.teamLineup[0].expected.starter[14].position;
        //center field
        var a_cf = res.gamestartinglineup.teamLineup[0].expected.starter[13].position;
        //short stop
        var a_ss = res.gamestartinglineup.teamLineup[0].expected.starter[12].position;
        //rigth field
        var a_rf = res.gamestartinglineup.teamLineup[0].expected.starter[3].position;
        //left field
        var a_lf = res.gamestartinglineup.teamLineup[0].expected.starter[19].position;
        //center
        var a_c = res.gamestartinglineup.teamLineup[0].expected.starter[7].position;

        //firstbase
        var h_1b = res.gamestartinglineup.teamLineup[1].expected.starter[18].position;
        //secondbase
        var h_2b = res.gamestartinglineup.teamLineup[1].expected.starter[16].position;
        //thirdbase
        var h_3b = res.gamestartinglineup.teamLineup[1].expected.starter[5].position;
        //pitch
        var h_p = res.gamestartinglineup.teamLineup[1].expected.starter[14].position;
        //center field
        var h_cf = res.gamestartinglineup.teamLineup[1].expected.starter[13].position;
        //short stop
        var h_ss = res.gamestartinglineup.teamLineup[1].expected.starter[12].position;
        //rigth field
        var h_rf = res.gamestartinglineup.teamLineup[1].expected.starter[3].position;
        //left field
        var h_lf = res.gamestartinglineup.teamLineup[1].expected.starter[19].position;
        //center
        var h_c = res.gamestartinglineup.teamLineup[1].expected.starter[7].position;


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
              case a_1b:
                  aPosArr.push(aplayerinfo)
                  break;
              case a_2b:
                  aPosArr.push(aplayerinfo)
                  break;
              case a_3b:
                  aPosArr.push(aplayerinfo)
                  break;
              case a_p:
                  aPosArr.push(aplayerinfo)
                  break;
              case a_cf:
                  aPosArr.push(aplayerinfo)
                  break;
              case a_ss:
                  aPosArr.push(aplayerinfo)
                  break;
              case a_rf:
                  aPosArr.push(aplayerinfo)
                  break;
              case a_lf:
                  aPosArr.push(aplayerinfo)
                  break;
              case a_c:
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
              case h_1b:
                  hPosArr.push(hplayerinfo)
                  break;
              case h_2b:
                  hPosArr.push(hplayerinfo)
                  break;
              case h_3b:
                  hPosArr.push(hplayerinfo)
                  break;
              case h_p:
                  hPosArr.push(hplayerinfo)
                  break;
              case h_cf:
                  hPosArr.push(hplayerinfo)
                  break;
              case h_ss:
                  hPosArr.push(hplayerinfo)
                  break;
              case h_rf:
                  hPosArr.push(hplayerinfo)
                  break;
              case h_lf:
                  hPosArr.push(hplayerinfo)
                  break;
              case h_c:
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
