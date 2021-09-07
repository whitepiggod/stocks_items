<template>
  <div class="box">
    <k-month class="month" ktype="day"></k-month>
    <k-month class="month" ktype="week"></k-month>
  </div>
</template>
<script>
import kMonth from './k_month.vue'

export default {
  components: {
    kMonth
  }
}
</script>

<style scoped>
.box {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.month {
  flex: 1;
}
</style>
