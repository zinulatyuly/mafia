import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    connected: false,
    joined: false,
    myId: Number(localStorage.id),
    players: [],
    hostId: 0
  },
  mutations: {
    SET_ID(state, value) {
      state.myId = value;
    },
    SET_CONNECTED(state, value) {
      state.connected = value;
    },
    SET_JOINED(state, value) {
      state.joined = value;
    },
    SET_HOST(state, value) {
      state.hostId = value;
    },
    SET_PLAYERS(state, value) {
      state.players = value;
      if (state.players.find(player => player.id === state.myId))
        state.joined = true;
    },
    ADD_PLAYER(state, player) {
      state.players.push(player);
      if (player.id === state.myId) state.joined = true;
    },
    RECONNECT_PLAYER(state, id) {
      const index = state.players.findIndex(player => player.id === id);
      if (index >= 0) state.players[index].status = true;
    },
    DISCONNECT_PLAYER(state, id) {
      const index = state.players.findIndex(player => player.id === id);
      if (index >= 0) state.players[index].status = false;
    }
  },
  actions: {
    socket_connect({ commit, state }, value) {
      commit("SET_CONNECTED", true);
      this._vm.$socket.emit("connected", state.myId);
    },
    socket_disconnect({ commit }, value) {
      commit("SET_CONNECTED", false);
    },
    socket_players({ commit }, players) {
      commit("SET_PLAYERS", players);
    },
    socket_host_existed({ commit }, number) {
      commit("SET_HOST", Number(number));
    },
    socket_newbie({ commit }, player) {
      commit("ADD_PLAYER", JSON.parse(player));
    },
    socket_joined: function({ commit }, bool) {
      commit("SET_JOINED", bool);
    },
    socket_reconnected: function({ commit }, id) {
      commit("RECONNECT_PLAYER", Number(id));
    },
    socket_disconnected: function({ commit }, id) {
      commit("DISCONNECT_PLAYER", Number(id));
    }
  },
  modules: {}
});
