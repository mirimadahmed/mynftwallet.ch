<template>
  <div>
    <div class="row m-0 px-2 chains-mobile">
      <div
        class="col chain-mobile"
        v-for="chain in chains"
        :key="chain + 1"
        :class="nfts[chain].length > 0 && 'selected'"
      >
        <img :src="`./assets/${chain}.png`" alt="" />
      </div>
    </div>
    <div class="row m-0 px-2 chains">
      <div
        class="col chain"
        v-for="chain in chains"
        :key="chain + 1"
        :class="nfts[chain].length > 0 && 'selected'"
      >
        <img :src="`./assets/${chain}.png`" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Chains",
  computed: {
    chains() {
      return this.$store.state.chains;
    },
    nfts() {
      return this.$store.state.nfts;
    },
  },
};
</script>
<style scoped>
img {
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
}

.selected img {
  filter: none;
}

.chain,
.chain-mobile {
  background: #ffffff;
  box-shadow: 0px 0px 4px 8px rgba(0, 0, 0, 0.25);
  border-radius: 0px 15px 15px 0px;
  margin-top: 14px !important;
  height: 72px !important;
  width: 69px !important;
  flex: none;
}

.chains-mobile {
  display: none;
}

.chains {
  text-align: right;
  position: absolute;
  top: 20%;
  padding-left: 0 !important;
  flex-direction: column;
  display: flex;
}

.chains > .selected {
  width: 94px !important;
}

.chain img {
  height: 40px;
  margin-top: 16px;
}

@media screen and (max-width: 425px) {
  .chains {
    display: none;
  }
  .chains-mobile {
    display: flex;
  }
  .chain-mobile {
    text-align: center;
    box-shadow: 0px 6px 5px 2px rgba(0, 0, 0, 0.25);
    border-radius: 0px 0px 5px 5px;
    height: 44px !important;
    margin-top: 0 !important;
    flex: 1;
    margin-right: 5px;
    margin-left: 5px;
  }
  .chain-mobile img {
    width: 90% !important;
    padding-top: 5px;
    vertical-align: middle;
  }
  .selected {
    height: 70px !important;
  }
  .selected img {
    padding-top: 25px;
  }
}
</style>