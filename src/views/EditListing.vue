<template>
  <div class="edit-listing">
    <div class="edit-listing-picture">
      <br /><br />
      <img
        class="edit-picture-display"
        src="../assets/background.png"
        @click="changePicture"
      />
      <input id="imageUpload" type="file" required="" capture />
    </div>

    <div class="edit-listing-details">
      <br /><br />
      <h2>Product Name:</h2>
      <br />
      <br />
      <h2>Quantity Description:</h2>
      <br />
      <br />
      <h2>Price:</h2>
      <br />
      <br />
    </div>
  </div>
</template>

<script>
export default {
  name: "EditListing",
  methods: {
    changePicture() {
      document.getElementById("imageUpload").click();
    },
  },
};
</script>

<style lang="scss" scoped>
.edit-listing {
  display: flex;
  .edit-listing-picture {
    width: 50%;
    img {
      width: 70%;
      height: 150%;
      position: relative;
      left: 10%;
    }
    .edit-picture-display {
      cursor: pointer;
    }
    #imageUpload {
      display: none;
    }
  }
  .edit-listing-details {
    width: 50%;
  }
}
</style>
