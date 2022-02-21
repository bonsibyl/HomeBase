<template>
  <div class="indiv-tags">
    <span class="text">
      {{ tag }}
    </span>
  </div>
</template>

<script>
export default {
  name: "IndividualTags",
  props: {
    tag: String,
  },
};
</script>

<style lang="scss" scoped>
.indiv-tags {
  .text {
    text-align: center;
    background-color: #dad4d4;
    border-radius: 10px;
    margin: 3px;
    padding: 10px 10px 10px 10px;
  }
}
</style>
