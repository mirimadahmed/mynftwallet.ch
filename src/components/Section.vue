<template>
  <div class="row m-0 custom-bg" :class="`chain-${chain}`">
    <div class="col-12 px-3 pb-3 pt-5">
      <div class="row">
        <div class="col-4 col-md-2 m-auto base-row">
          <b-img
            center
            :src="`/assets/${chain}.png`"
            rounded="circle"
            :alt="chain"
            class="chain-bg width-100"
          ></b-img>
        </div>
      </div>
      <div class="row">
        <template v-for="nft in nfts[chain]">
          <div class="col-md-3 col-6 p-3" :key="nft.token_id" v-if="nft">
            <NFT :nft="nft" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import NFT from "@/components/NFT.vue";
export default {
  components: {
    NFT,
  },
  props: {
    chain: {
      type: String,
      required: true,
    },
  },
  computed: {
    nfts() {
      return this.$store.state.nfts;
    },
  },
};
</script>

<style>
.base-row {
  margin-top: -5rem !important;
}
.custom-bg {
  box-shadow: 0px 0px 3px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}

.chain-bg {
  background: #ffffff;
  padding: 10px;
}
</style>