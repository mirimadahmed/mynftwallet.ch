<template>
  <div id="app">
    <div id="nav">
      <template v-if="isAuthenticated && user">
        {{ address }} <button @click="logout">Logout</button>
      </template>
      <template v-else>
        <button @click="login">Connect wallet</button>
      </template>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.state.user !== null;
    },
    user() {
      return this.$store.state.user;
    },
    address() {
      return this.$store.state.user ? this.$store.state.user.ethAddress : null;
    },
  },
  methods: {
    setUser(payload) {
      this.$store.commit("setAuthentication", payload);
    },
    async login() {
      const user = await this.$moralis.Web3.authenticate();
      this.setUser({ ethAddress: user.get("ethAddress"), ...user });
      this.$router.push(`/${user.get("ethAddress")}`);
    },
    async logout() {
      await this.$moralis.User.logOut();
      this.setUser(null);
    },
    handleCurrentUser() {
      const user = this.$moralis.User.current();
      if (user) {
        this.setUser(user);
      }
    },
  },
  mounted() {
    this.handleCurrentUser();
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
