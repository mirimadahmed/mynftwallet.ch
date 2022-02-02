<template>
  <div class="about">
    <h1>NFT Collections</h1>
  </div>
</template>
<script>
import Moralis from "moralis";
import axios from "axios";
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
          const promises = [];
          res.result.forEach((nft) => {
            promises.push(
              axios.get(nft.token_uri).then((res) => {
                nft.data = res.data;
                console.log(res.data);
              })
            );
          });
          Promise.all(promises).then(() => {
            this.$store.commit("setNFTs", { nfts: res.result, chain: chain });
          });
        });
      });
    },
  },
};
</script>