function showHome(){
  $('#awayLineup').hide();
  $('#homeLineup').show();

  $('#awayShow').removeClass('button-active');
  $('#homeShow').addClass('button-active');
}
function showAway(){
  $('#homeLineup').hide();
  $('#awayLineup').show();

  $('#homeShow').removeClass('button-active');
  $('#awayShow').addClass('button-active');
}
//unplayed Views








// var store = new Vuex.Store({
//   state: {
//     players: []
//   },
//   mutations: {
//     setPlayers: function(state, players){
//       this.state.players.splice(0)
//       for(var i in players){
//         this.state.players.push(players[i].player);
//       }
//       console.log("PLAYERS: ",players);
//     }
//   }
// });
//
// var app = new Vue({
//   el: "#homeTeamLineUp",
//   methods:{
//
//   },
//   computed:{
//
//   },
//   beforeMount: function(){
//
//   }
// })
