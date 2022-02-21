<template>
  <div>
    <button class="add-to-cart">
      <img
        class="add-to-cart-icon"
        src="../assets/Icons/rating-star-gold.png"
      />
      <span class="add-to-cart-text">Add to Cart</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "AddToCart",
};
</script>

<style lang="scss" scoped>
.add-to-cart {
  display: flex;
  background-color: #a76e2a;
  flex-direction: row;
  border-radius: 10px;
  .add-to-cart-icon {
    width: 20px;
    height: auto;
  }
  .add-to-cart-text {
    margin-left: 10px;
    text-align: center;
  }
}
</style>
>
