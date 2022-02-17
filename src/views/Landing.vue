<template>
  <div class="landing-container">
    <div v-if="isSeller" class="landing-rectangle">
      <strong class="supporting-header"
        >Home-Based Food Businesses At Your Fingertips.</strong
      >
      <br />
      <p class="supporting-text">
        With over 100 reputable small local food businesses on our platform,
        there is sure to be an option for you.
      </p>
      <br />
      <router-link
        :to="{ name: 'Register' }"
        tag="button"
        class="landing-register-button"
      >
        Hop on homebase!
      </router-link>
    </div>
    <div v-else class="landing-rectangle">
      <strong class="supporting-header"
        >Boost Your Online Presence & Reach With HomeBase.</strong
      >
      <br />
      <p class="supporting-text">
        Our platform encompasses an integrated e-commerce system for your
        business that's as easy as 1,2,3.
      </p>
      <br />
      <router-link
        :to="{ name: 'Register' }"
        tag="button"
        class="landing-register-button"
        >Join our team of merchants!</router-link
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
  background-repeat: no-repeat;
  background-size: cover;
  height: 66vh;
  text-align: center;

  .landing-rectangle {
    padding: 50px;
    background-color: rgba(255, 255, 255, 0.7);
    position: relative;
    display: flex;
    flex-direction: column;
    left: 10%;
    top: 10%;
    width: 25%;
    .supporting-header {
      font-size: 30px;
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
