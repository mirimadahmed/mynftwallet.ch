<template>
  <div class="row m-0 p-2 mt-5">
    <div class="col-12 col-md-10 m-auto my-3" v-for="chain in chains" :key="chain">
      <template v-if="nfts[chain].length > 0">
        <Section :chain="chain" />
        <div class="row m-0 p-2">
          <div class="col-12 advert p-1">
            <span>Ad</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
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
};
</script>

<style>
.advert {
  background: #C4C4C4;
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