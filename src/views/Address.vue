<template>
  <div class="about">
    <b-jumbotron
      header="Multichain NFT Collections"
      lead="Connect your wallet to and see all your nfts in one place."
      class="bg-light p-5 m-0"
    >
    </b-jumbotron>
    <div class="row m-0 p-5">
      <b-tabs content-class="mt-3 text-center" justified>
        <template v-for="(chain, index) in chains">
          <b-tab v-if="nfts[chain].length > 0" :title="getChainTitle(chain)" :active="index === 0" :key="chain">
            <div class="row">
              <div
                class="col-md-3"
                v-for="nft in nfts[chain]"
                :key="nft.token_id"
              >
                <b-card
                  :title="nft.data.name"
                  :img-src="getNFTImage(nft)"
                  :img-alt="nft.data.name"
                  img-top
                  border-variant="primary"
                  header-bg-variant="primary"
                  header-text-variant="white"
                  align="center"
                  tag="article"
                  class="mb-2 shadow"
                >
                  <b-card-text>
                    {{ nft.data.description }}
                  </b-card-text>
                  <b-badge
                    v-for="(attribute, index) in nft.data.properties"
                    :key="index"
                    variant="primary"
                    badge-variant="light"
                    pill
                    >{{ attribute.value }}</b-badge
                  >
                </b-card>
              </div>
            </div>
          </b-tab>
        </template>
      </b-tabs>
    </div>
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
  data() {
    return {
      chains: chains,
      chainTitles: {
        "eth": "Ethereum",
        "bsc": "Binance Smart Chain",
        "matic": "Matic",
        "avalanche": "Avalanche",
        "fantom": "Fantom",
      }
    };
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
              }).then(() =>{
                const options = { address: nft.token_address, chain: chain };
                return Moralis.Web3API.token.getNFTLowestPrice(options).then(nftPrice => {
                  nft.price = nftPrice.result;
                });
              })
            );
          });
          Promise.all(promises).then(() => {
            this.$store.commit("setNFTs", { nfts: res.result, chain: chain });
          });
        });
      });
    },
    getNFTImage(nft) {
      if (nft.data.image) {
        if (nft.data.image.includes("ipfs://")) {
          return nft.data.image.replace(
            "ipfs://",
            "https://ipfs.moralis.io:2053/ipfs/"
          );
        } else {
          return nft.data.image;
        }
      } else if (nft.data.image_url) {
        if (nft.data.image_url.includes("ipfs://")) {
          return nft.data.image_url.replace(
            "ipfs://",
            "https://ipfs.moralis.io:2053/ipfs/"
          );
        } else {
          return nft.data.image_url;
        }
      }
    },
    getChainTitle(chain) {
      return this.chainTitles[chain];
    }
  },
};
</script>
<style>
.card-img-top {
  background: blue;
}
</style>