<template>
  <div id="app">
    <div id="nav">
      <Navbar />
    </div>
    <div>
      <Chains />
    </div>
    <router-view />
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import Chains from "@/components/Chains.vue";

export default {
  components: {
    Navbar,
    Chains
  },
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
body, html {
  background: #0E384F !important;
}
</style>
