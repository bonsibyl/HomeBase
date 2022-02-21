<template>
  <div class="edit-listing">
    <!--- edit route ----->
    <router-link
      :to="{ name: 'EditListing', params: { id: this.$route.params.id } }"
      tag="button"
      class="edit-listing-button"
      >Edit Listing</router-link
    >
  </div>
</template>

<script>
export default {
  name: "EditListingButton",
  props: {
    test: String,
  },
};
</script>

<style lang="scss" scoped>
.edit-listing {
  display: inline-block;
  .edit-listing-button {
    display: inline-block;
    border-radius: 10px;
    text-align: center;
    background-color: #6b7855;
    color: #ffffff;
    font-weight: 600;
  }
}
</style>
