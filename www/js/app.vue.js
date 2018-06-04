
var store = new Vuex.Store({
  state: {
    players: []
  },
  mutations: {
    setPlayers: function(state, players){
      this.state.players.splice(0)
      for(var i in players){
        this.state.players.push(players[i].player);
      }
    }
  }
});

var app = new Vue({
  el: ".homeLineup",
  store: store,
  methods:{

  },
  computed:{
    
  },
  beforeMount: function(){

  }
})
