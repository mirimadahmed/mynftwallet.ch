<template>
  <b-card
    :title="nft.data && nft.data.name"
    :img-src="getNFTImage(nft)"
    :img-alt="nft.data && nft.data.name"
    img-top
    border-variant="dark"
    tag="article"
    class="mb-2 text-left"
  >
    <b-card-text>
      {{ nft.data.description && nft.data.description.substr(0, 15) }}...
      Floor: {{ nft.price }}
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  props: {
    nft: {
      type: Object,
      required: true,
    },
  },
  methods: {
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
  },
};
</script>

<style>
.card {
  background: #C4C4C4;
  border-radius: 10px;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 26px;
  letter-spacing: 0em;
  text-align: left;
}
.card-body {
  background: #f0effe;
  border-radius: 0px 0px 10px 10px;
}
</style>