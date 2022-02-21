<template>
  <div class="opening-hours">
    <div class="opening-header">
      <strong><u>Opening Hours</u></strong>
    </div>
    <br />
    <div class="opening-details">
      <div class="days">
        <p>Monday</p>
        <p>Tuesday</p>
        <p>Wednesday</p>
        <p>Thursday</p>
        <p>Friday</p>
        <p>Saturday</p>
        <p>Sunday</p>
      </div>
      <div class="hours">
        <p v-for="(content, index) in OpeningHours" :key="index">
          {{ content }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OpeningHours",
  props: {
    OpeningHours: Array,
  },
};
</script>

<style lang="scss" scoped>
.opening-hours {
  width: 30%;
  .opening-header {
  }
  .opening-details {
    display: flex;
    flex-direction: row;
    width: 100%;
    min-width: 50%;
    justify-content: space-between;
    .hours {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
