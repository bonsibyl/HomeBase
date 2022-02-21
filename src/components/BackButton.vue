<template>
  <div class="back-button">
    <div class="back-button-arrow">
      <router-link to="/Register">
        <img src="../assets/Icons/back-arrow.png" />
        <span class="back-button-text">{{ backButtonText }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "BackButton",
  props: {
    backButtonText: String,
  },
};
</script>

<style lang="scss" scoped>
.back-button {
  display: inline-block;
  .back-button-arrow img {
    display: inline-block;
    vertical-align: top;
    max-width: 100%;
    height: auto;
    width: 25px;
  }
  .back-button-text {
    display: inline-block;
    font-size: 20px;
  }
}
</style>
>
