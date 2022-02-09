<template>
  <div class="row m-0 p-2">
    <div class="col-12" v-for="chain in chains" :key="chain">
      <Section />
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
      return this.$store.state.chains;
    },
  },
};
</script>