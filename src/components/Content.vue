<template>
  <div class="row m-0 p-2 mt-5">
    <div class="row m-0" v-if="loading">
      <div class="col-6 m-auto text-center">
        <b-spinner
          type="grow"
          variant="info"
          style="width: 3rem; height: 3rem"
        />
      </div>
    </div>
    <div
      v-else
      class="col-12 col-md-10 m-auto my-3"
      v-for="chain in chains"
      :key="chain"
    >
      <template v-if="nfts[chain].length > 0">
        <Section :chain="chain" />
        <div class="row m-0 p-2 my-3">
          <div class="col-12 advert p-1">
            <span>Ad</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Moralis from "moralis";
import Section from "@/components/Section.vue";
export default {
  components: {
    Section,
  },
  computed: {
    chains() {
      return ["Eth", "Polygon", "Ftm", "Bsc", "Avax"];
    },
    nfts() {
      return this.$store.state.nfts;
    },
  },
  mounted() {
    this.getBalanaces();
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
      const address =
        this.$route.params.address || this.$store.state.user.ethAddress;
      query.equalTo("owner_of", address);
      // subscribe for real-time updates
      const subscription = await query.subscribe();
      this.subscriptions.push(subscription);
      subscription.on("create", (result) => {
        this.$store.commit("pushNFT", { nfts: result, chain: chain });
      });
      return query
        .find()
        .then((results) => {
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
                axios
                  .get(uri)
                  .then((res) => {
                    result.data = res.data;
                  })
                  .then(() => {
                    const options = {
                      chain: chain,
                      address: result.get("token_address"),
                      days: "3",
                    };
                    Moralis.Web3API.token
                      .getNFTLowestPrice(options)
                      .then((res) => {
                        result.price = (res.price * Math.pow(10, -18)).toFixed(
                          2
                        );
                        this.$store.commit("pushNFT", {
                          nft: result,
                          chain: chain,
                        });
                      })
                      .catch((err) => {
                        console.log(err);
                        result.price = 0;
                        this.$store.commit("pushNFT", {
                          nft: result,
                          chain: chain,
                        });
                      });
                  });
              }
            });
          }
        })
        .then(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style>
.advert {
  background: #c4c4c4;
  height: 90px;
  font-family: Poppins;
  font-size: 11px;
  font-style: normal;
  font-weight: 600;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
}
</style>