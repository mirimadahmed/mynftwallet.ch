<template>
  <div>
    <div class="row m-0 p-5">
      <b-tabs content-class="mt-3 text-center" justified>
        <template v-for="(chain, index) in chains">
          <b-tab
            v-if="nfts[chain].length > 0"
            :title="getChainTitle(chain)"
            :active="index === 0"
            :key="chain"
          >
            <div class="row">
              <template v-for="nft in nfts[chain]">
                <div class="col-md-3" :key="nft.token_id" v-if="nft.data">
                  <b-card
                    :title="nft.data && nft.data.name"
                    :img-src="getNFTImage(nft)"
                    :img-alt="nft.data && nft.data.name"
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
                    <template v-for="(attribute, index) in nft.data.properties">
                      <b-badge
                        v-if="attribute.trait_type"
                        :key="index"
                        variant="primary"
                        style="background: blue"
                        class="m-1"
                        pill
                      >
                        {{ attribute.trait_type }} {{ attribute.value }}
                      </b-badge>
                    </template>
                    <template v-for="(attribute, index) in nft.data.attributes">
                      <b-badge
                        v-if="attribute.trait_type"
                        :key="index"
                        variant="primary"
                        style="background: blue"
                        class="m-1"
                        pill
                      >
                        {{ attribute.trait_type }} {{ attribute.value }}
                      </b-badge>
                    </template>
                  </b-card>
                </div>
              </template>
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
        eth: "Ethereum",
        bsc: "Binance Smart Chain",
        matic: "Matic",
        avalanche: "Avalanche",
        fantom: "Fantom",
      },
    };
  },
  methods: {
    getBalanaces() {
      chains.forEach((chain) => {
        this.$store.commit("setNFTs", { nfts: [], chain: chain });
      });
      chains.forEach((chain) => {
        const options = { chain: chain, address: this.$route.params.address };
        Moralis.Web3API.account.getNFTs(options).then((res) => {
          const promises = [];
          res.result.forEach((nft) => {
            if (nft.token_uri !== null) {
              promises.push(
                axios.get(nft.token_uri).then((res) => {
                  nft.data = res.data;
                })
              );
            }
            // promises.push(
            //   axios
            //     .get(nft.token_uri)
            //     .then((res) => {
            //       nft.data = res.data;
            //     })
            //     // .then(() => {
            //     //   const options = { address: nft.token_address, chain: chain };
            //     //   return Moralis.Web3API.token
            //     //     .getNFTLowestPrice(options)
            //     //     .then((nftPrice) => {
            //     //       nft.price = nftPrice.result;
            //     //     })
            //     //     .catch((e) => {
            //     //       console.log(e);
            //     //     });
            //     // })
            //     // .catch((e) => {
            //     //   console.log(e);
            //     // })
            // );
          });
          Promise.all(promises).then(() => {
            this.$store.commit("setNFTs", { nfts: res.result, chain: chain });
          });
        });
      });
    },
    getNFTImage(nft) {
      if (nft.data) {
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
      }
    },
    getChainTitle(chain) {
      return this.chainTitles[chain];
    },
  },
};
</script>
<style>
.card-img-top {
  background: blue;
}
</style>