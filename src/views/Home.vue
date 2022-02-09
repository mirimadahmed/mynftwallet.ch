<template>
  <div class="home">
    <Content v-if="user" />
    <NotConnected v-else />
  </div>
</template>

<script>
import NotConnected from "@/components/NotConnected.vue";
import Content from "@/components/Content.vue";

export default {
  name: "Home",
  components: {
    NotConnected,
    Content
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  }
};
</script>
<style scoped>
</style>