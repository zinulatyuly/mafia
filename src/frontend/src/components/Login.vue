<template>
  <div class="center-container">
    <img alt="MAFIOSI" src="/mafiosi.svg" width="200px" />
    <h1 class="mafia">Мафия</h1>
    <form class="flex flex-center" @submit.prevent="submitForm">
      <div class="input-group">
        <label for="login-name">></label>
        <input
          id="login-name"
          :class="`width-${width}`"
          type="text"
          placeholder="Представьтесь"
          v-model="fixedName"
        />
      </div>
      <div class="block align-center margin-h1">
        <button type="submit" :disabled="name.length < 3">
          Вступить в игру
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      width: 50
    };
  },
  computed: {
    fixedName: {
      get() {
        return this.name;
      },
      set(value) {
        this.name = value.toUpperCase();
        this.width = Math.ceil(value.length / 2 || 1) * 10;
      }
    }
  },
  methods: {
    submitForm() {
      // eslint-disable-next-line no-undef
      this.$axios
        .post("/users/create", { name: this.name })
        .then(({ data }) => {
          localStorage.id = data.id;
        });
    }
  }
};
</script>
