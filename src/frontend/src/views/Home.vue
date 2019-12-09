<template>
  <PlayerList v-if="authorized" />
  <Login v-else />
</template>

<script>
// @ is an alias to /src
import Login from "@/components/Login.vue";
import PlayerList from "@/components/PlayerList.vue";

export default {
  components: {
    Login,
    PlayerList
  },
  data() {
    return {
      authorized: false
    };
  },
  created() {
    if (localStorage.id) this.authorized = true;
  }
};
</script>
