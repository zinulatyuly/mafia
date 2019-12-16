<template>
  <div>
    <h1 class="mafia align-center">Список игроков</h1>
    <h2 class="align-center mt-0">
      вы&nbsp;
      <span :class="[$store.state.connected ? 'text-green' : 'text-red']">{{
        $store.state.connected ? "в сети" : "не в сети"
      }}</span>
    </h2>
    <div class="flex flex-center flex-end m-20 min-height-abs-50">
      <table class="width-90">
        <thead>
          <tr>
            <th width="75%">Имя</th>
            <th width="25%">Статус</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!$store.state.players.length && $store.state.connected">
            <td colspan="2"><i>игроков нет</i></td>
          </tr>
          <tr v-for="player in $store.state.players" :key="player.id">
            <td :class="{ 'text-bold': $store.state.myId === player.id }">
              {{ player.name }}
            </td>
            <td :class="[player.status ? 'text-green' : 'text-red']">
              {{ player.status ? "в сети" : "не в сети" }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="align-center">
      <button
        v-if="!($store.state.myId === $store.state.hostId)"
        type="button"
        :disabled="!$store.state.connected || $store.state.joined"
        @click="joinToGame"
      >
        Присоединиться
      </button>
      <button
        v-else
        type="button"
        @click="startGame"
      >
        Начать игру
      </button>
      <button v-if="!$store.state.hostId" type="button" @click="beHost">
        Стать ведущим
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    if (!this.$store.state.myId) this.$router.push("/");
  },
  methods: {
    joinToGame() {
      this.$socket.emit("join", this.$store.state.myId);
    },
    beHost() {
      this.$socket.emit("host", this.$store.state.myId);
    },
    startGame() {
      console.log('start_game');
    }
  }
};
</script>
