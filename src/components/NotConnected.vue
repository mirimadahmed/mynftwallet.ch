<template>
  <div class="not-connected">
    <div class="row m-0 py-5">
      <div class="m-auto logo-holder text-center">
        <LogoBig class="m-auto w-50" />
      </div>
    </div>
    <div class="row m-0 py-3">
      <p>Connect your wallet to and see all your NFTs in one place</p>
    </div>
    <div class="row m-0 py-3 text-center">
      <Button class="m-auto" text="CONNECT" @click="connect" />
    </div>
  </div>
</template>

<script>
import LogoBig from "@/components/LogoBig.vue";
import Button from "@/components/Button.vue";
export default {
  name: "NotConnected",
  components: {
    LogoBig,
    Button,
  },
  methods: {
    setUser(payload) {
      this.$store.commit("setAuthentication", payload);
    },
    connect() {
      const user = this.$moralis.User.current();
      if (user) {
        this.setUser({ ethAddress: user.get("ethAddress"), ...user });
        this.$router.push(`/wallet/${user.get("ethAddress")}`);
      } else {
        this.$moralis.authenticate().then((user) => {
          this.setUser({ ethAddress: user.get("ethAddress"), ...user });
          this.$router.push(`/wallet/${user.get("ethAddress")}`);
        });
      }
    },
  },
};
</script>
<style scoped>
p {
  font-size: 24px;
  font-style: normal;
  font-weight: 300;
  line-height: 36px;
  letter-spacing: 0em;
  text-align: center;
  color: #ffffff;
}

.logo-holder {
  width: 35%;
}

@media screen and (max-width: 425px) {
  .logo-holder {
    width: 80%;
  }
}
</style>