<template>
  <footer>
    <div class="container">
      <div class="left">
        <div class="col-1">
          <div class="landing-text">
            <img src="../assets/Icons/trophy-landing.png" class="png-icon" />
            <span class="footer-text">
              <strong v-if="isSeller"
                >Championing Platform for Local Small Businesses</strong
              >
              <strong v-else
                >#1 Integrated Platform for Local Small Businesses</strong
              >
            </span>
          </div>
          <div class="landing-text">
            <img src="../assets/Icons/success-landing.png" class="png-icon" />

            <span class="footer-text"
              ><strong v-if="isSeller"
                >Verified Home-Based Food Businesses</strong
              >
              <strong v-else
                >Easy & Convenient Interface with Low Shop Maintenance</strong
              ></span
            >
          </div>
        </div>
        <div class="col-2">
          <div class="landing-text">
            <img src="../assets/Icons/deliver-landing.png" class="png-icon" />
            <span class="footer-text"
              ><strong v-if="isSeller"
                >Integrated & Seamless End-to-End Purchase Process</strong
              >
              <strong v-else
                >Transparent Data Analysis of Shop & Consumer Behaviour</strong
              ></span
            >
          </div>
          <div class="landing-text">
            <img src="../assets/Icons/headset-landing.png" class="png-icon" />
            <span class="footer-text"
              ><strong v-if="isSeller"
                >Authentic Reviews & Ratings For Better Decision-Making</strong
              ><strong v-else
                >Customer Communication System for Quick Order Handling></strong
              ></span
            >
          </div>
        </div>
      </div>
      <div class="right">
        <div class="landing-change">
          <p class="landing-change-text">
            <strong v-if="isSeller">Are you a merchant?</strong>
            <strong v-else>Are you a customer?</strong>
          </p>
          <button
            v-if="isSeller"
            class="landing-change-button"
            @click="updateSeller()"
          >
            Click here to find out how we can help your business!
          </button>
          <button v-else class="landing-change-button" @click="updateSeller()">
            Click here to begin your search for home bakes!
          </button>
        </div>
      </div>
      <div class="contact-details">
        <p>
          <b>Reach us at:</b><br />
          17 Kent Ridge Lane Singapore 123456 <br />+65 8123 4567<br />
          info@homebase.com
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
// import youTube from "../assets/Icons/youtube-brands.svg";
// import twitter from "../assets/Icons/twitter-brands.svg";
// import instagram from "../assets/Icons/instagram-brands.svg";
// import linkedin from "../assets/Icons/linkedin-brands.svg";

export default {
  name: "footer-vue",
  components: {
    //registering all the components for usage
    // youTube,
    // twitter,
    // instagram,
    // linkedin,
  },
  methods: {
    updateSeller: function () {
      this.$store.commit("updateSeller");
      console.log(this.$store.state.isSeller);
    },
  },
  computed: {
    user() {
      return this.$store.state.user; //returns value of true or false
    },
    isSeller() {
      return this.$store.state.isSeller;
    },
  },
};
</script>

<!-- basic styling-->
<style lang="scss" scoped>
footer {
  margin-top: auto;
  padding: 30px 25px;
  background-color: #fffbf5;
  .container {
    display: flex;
    flex-direction: column;
    gap: 32px;
    @media (min-width: 800px) {
      flex-direction: row;
      gap: 0px;
    }
    .png-icon {
      width: 30px;
      height: auto;
      display: flex;
      flex-direction: row;
      align-self: center;
    }
    .landing-text {
      display: flex;
      gap: 10px;
      flex-direction: row;
    }
    .left {
      display: flex;
      flex-direction: row;
      gap: 50px;
      width: 55%;

      .col-1 {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        gap: 30px;
        font-size: 15px;
        width: 40%;
      }
      .col-2 {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        gap: 30px;
        font-size: 15px;
        width: 50%;
      }
    }
    .right {
      width: 35%;
      .landing-change {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        .landing-change-text {
          text-align: center;
          padding: 0;
          margin: 0 0 10px 0;
        }
        .landing-change-button {
          border-radius: 0px;
          margin: 0;
          height: 75px;
          width: 80%;
          background-color: #c79b73;
          color: #ffffff;
          font-weight: 600;
        }
      }
    }
    .contact-details {
      display: flex;
      width: 20%;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
  }
}
</style>
