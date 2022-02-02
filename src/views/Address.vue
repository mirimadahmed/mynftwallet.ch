<template>
  <div class="about">
    <h1>NFT Collections</h1>
  </div>
</template>
<script>
import Moralis from "moralis";
const chains = ["eth", "bsc", "matic", "avalanche", "fantom"];
export default {
  name: "addressbalance",
  mounted() {
    this.getBalanaces();
  },
  computed: {
    nfts() {
      return this.$store.state.nfts;
    },
  },
  methods: {
    getBalanaces() {
      chains.forEach((chain) => {
        const options = { chain: chain, address: this.$route.params.address };
        Moralis.Web3API.account.getNFTs(options).then((res) => {
          console.log(res);
          this.$store.commit("setNFTs", { nfts: res.result, chain: chain });
        });
      });
    },
  },
};
</script>