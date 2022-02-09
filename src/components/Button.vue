<template>
  <b-button @click="$emit('click')">
    {{ text }}
  </b-button>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>
<style scoped>
.btn,
.btn:hover,
.btn:focus,
.btn:active {
  background: linear-gradient(181.21deg, #5affff 36.23%, #2fbda2 80.01%);
  box-shadow: 0px 0px 8px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  height: 54px;
  width: 187px;
  border: unset;
  line-height: 34.5px;
  font-size: 23px;
  font-weight: 900;
  color: #0e384f;
}
</style>