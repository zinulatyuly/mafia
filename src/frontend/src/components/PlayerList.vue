<template>
  <div>
    <h1 class="mafia align-center">Список игроков</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      players: []
    };
  },
  created() {
    this.$axios.get("/users").then(({ data }) => {
      this.players = data;
    });
  }
};
</script>
