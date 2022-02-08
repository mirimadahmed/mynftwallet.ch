<template>
  <div id="app">
    <div id="nav">
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand class="ms-3"> mynftwallet.ch </b-navbar-brand>
        <template v-if="isAuthenticated && user">
          <b-navbar-nav class="ms-auto">
            <b-nav-item href="#">
              <router-link :to="`/${user.ethAddress}`">
                Wallet
              </router-link>
            </b-nav-item>
            <b-button class="mr-5" @click="logout">
              {{ address }}... Logout
            </b-button>
          </b-navbar-nav>
        </template>
        <template v-else>
          <b-button class="ms-auto mr-5" @click="login"
            >Connect wallet</b-button
          >
        </template>
      </b-navbar>
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
      return this.$store.state.user
        ? this.$store.state.user.ethAddress.substr(0, 8)
        : null;
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
        this.setUser({ ethAddress: user.get("ethAddress"), ...user });
        this.$router.push(`/${user.get("ethAddress")}`);
      }
    },
  },
};
</script>
<style>
</style>
