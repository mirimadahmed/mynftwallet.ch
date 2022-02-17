<template>
  <b-navbar toggleable="lg" variant="light" class="shadow">
    <b-navbar-brand href="/" class="ms-3">
      <Logo />
    </b-navbar-brand>
    <template v-if="isAuthenticated && user">
      <b-navbar-nav class="ms-auto p-3 nav-buttons">
        <Button class="mx-2" text="WALLET" @click="handleCurrentUser" />
        <Button class="mr-5" text="DISCONNECT" @click="logout" />
      </b-navbar-nav>
      <b-navbar-nav class="ms-auto p-3 nav-mobile">
        <img src="../assets/unlink.png" class="unlink-bg" alt="">
      </b-navbar-nav>
    </template>
  </b-navbar>
</template>
<script>
import Logo from "@/components/Logo.vue";
import Button from "@/components/Button.vue";

export default {
  components: {
    Logo,
    Button,
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.user !== null;
    },
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    setUser(payload) {
      this.$store.commit("setAuthentication", payload);
    },
    async logout() {
      await this.$moralis.User.logOut();
      this.setUser(null);
    },
    handleCurrentUser() {
      const user = this.$moralis.User.current();
      if (user) {
        this.setUser({ ethAddress: user.get("ethAddress"), ...user });
        this.$router.push(`/wallet/${user.get("ethAddress")}`);
      }
    },
  },
};
</script>
<style>
.unlink-bg {
  background-image: url("../assets/btn-bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  padding: 15px;
}
.nav-mobile {
  display: none !important;
}

.nav-buttons {
  display: flex;
}

@media screen and (max-width: 768px) {
  .nav-buttons {
    display: none !important;
  }
  .nav-mobile {
    display: flex !important;
  }
}
</style>