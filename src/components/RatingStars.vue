<template>
  <div class="rating-star">
    <img
      v-for="(gold, index) in rating"
      src="../assets/Icons/rating-star-gold.png"
      :key="'gold' + index"
    />
    <img
      v-for="(grey, index) in 5 - rating"
      src="../assets/Icons/rating-star-grey.png"
      :key="'grey' + index"
    />
    <span v-if="!isReview" class="rating-star-text"
      >{{ numReviews }} Reviews</span
    >
  </div>
</template>

<script>
export default {
  name: "RatingStars",
  props: {
    rating: Number,
    numReviews: Number,
    isReview: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.rating-star {
  display: flex;
  flex-direction: row;
}
.rating-star img {
  width: 20px;
  height: auto;
}
.rating-star-text {
  margin-left: 10px;
}
</style>
>
