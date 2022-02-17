<template>
  <div>
    <div class="row m-0">
      <div v-if="loading" class="col-6 m-auto text-center">
        <b-spinner
          type="grow"
          variant="info"
          style="width: 3rem; height: 3rem"
        />
      </div>
      <Content v-else />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Content from "@/components/Content.vue";
import Moralis from "moralis";
export default {
  components: {
    Content,
  },
  name: "addressbalance",
  mounted() {
    this.getBalanaces();
  },
  computed: {
    nfts() {
      return this.$store.state.nfts;
    },
    chains() {
      return this.$store.state.chains;
    },
  },
  data() {
    return {
      loading: true,
      subscriptions: [],
      chainTitles: {
        Eth: "Ethereum",
        Bsc: "Binance Smart Chain",
        Polygon: "Matic",
        Avax: "Avalanche",
        Ftm: "Fantom",
      },
    };
  },
  beforeDestroy() {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  },
  methods: {
    getBalanaces() {
      this.loading = true;
      ["Eth", "Polygon", "Ftm", "Bsc", "Avax"].forEach((chain) => {
        this.$store.commit("setNFTs", { nfts: [], chain: chain });
      });
      const promises = [];
      ["Eth", "Polygon", "Ftm", "Bsc", "Avax"].forEach((chain) => {
        promises.push(this.getNFTBalanceFromChain(chain));
      });
      Promise.all(promises).then(() => {
        this.loading = false;
      });
    },
    async getNFTBalanceFromChain(chain) {
      const query = new Moralis.Query(`${chain}NFTOwners`);
      query.equalTo("owner_of", this.$route.params.address);
      // subscribe for real-time updates
      const subscription = await query.subscribe();
      this.subscriptions.push(subscription);
      subscription.on("create", (result) => {
        this.$store.commit("pushNFT", { nfts: result, chain: chain });
      });
      return query.find().then((results) => {
        if (results.length > 0) {
          results.forEach((result) => {
            if (
              result.get("token_uri") !== null ||
              result.get("token_uri") !== undefined
            ) {
              let uri = result.get("token_uri");
              if (uri.includes("ipfs://")) {
                uri = uri.replace("ipfs://", "https://ipfs.io/ipfs/");
              }
              axios.get(uri).then((res) => {
                console.log(res);
                result.data = res.data;
                this.$store.commit("pushNFT", { nft: result, chain: chain });
              });
            }
          });
        }
      }).then(() => {
        this.loading = false;
      });
    },
  },
};
</script>