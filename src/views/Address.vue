<template>
  <div>
    <Content v-if="user" />
    <NotConnected v-else />
  </div>
</template>
<script>
import NotConnected from "@/components/NotConnected.vue";
import Content from "@/components/Content.vue";
export default {
  components: {
    Content,
    NotConnected
  },
  name: "addressbalance",
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>