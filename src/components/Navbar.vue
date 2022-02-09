<template>
  <b-navbar toggleable="lg" variant="light" class="shadow">
    <b-navbar-brand class="ms-3">
      <Logo />
    </b-navbar-brand>
    <template v-if="isAuthenticated && user">
      <b-navbar-nav class="ms-auto">
        <Button class="mr-5" text="DISCONNECT" @click="logout" />
      </b-navbar-nav>
    </template>
  </b-navbar>
</template>
<script>
import Logo from "@/components/Logo.vue";
import Button from "@/components/Button.vue";

export default {
  components: {
    Logo,
    Button,
  },
};
</script>