<template>
  <div class="landing-container">
    <div v-if="$store.state.seller" class="landing-rectangle">
      <strong class="supporting-header">Welcome back to Homebase!</strong>

      <p class="supporting-text">
        How did your shop fare this week? <br>
        Take a look at your analytics dashboard.
      </p>
      <router-link
        :to="{ name: 'Dashboard' }"
        tag="button"
        class="landing-register-button"
      >
        View Shop Analytics
      </router-link>
    </div>
    <div v-else class="landing-rectangle">
      <strong class="supporting-header"
        >Welcome back to Homebase!</strong
      >
      <p class="supporting-text">
        Looking for something to satisfy your cravings?<br>
        Look no further, browse our bakes on offer today.
      </p>
      <router-link
        :to="{ name: 'Search' }"
        tag="button"
        class="landing-register-button"
        >View All Available Bakes!</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Landing",
  computed: {
    isSeller() {
      return this.$store.state.isSeller;
    },
  },
};
</script>

<style lang="scss" scoped>
.landing-container {
  background-image: url("../assets/LandingBackground.png");
  background-size: cover;
  height: 92vh;
  text-align: center;

  .landing-rectangle {
    padding: 50px;
    background-color: rgba(255, 255, 255, 0.7);
    position: relative;
    display: flex;
    flex-direction: column;
    left: 10%;
    top: 10%;
    width: 30%;
    .supporting-header {
      font-size: 25px;
      text-align: center;
    }
  }
  .landing-register-button {
    border-radius: 0px;
    height: 75px;
    background-color: #e89f71;
    color: #ffffff;
    font-weight: 600;
  }
}
</style>
