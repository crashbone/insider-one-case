<template>
  <div class="template">
    <ComponentOne />
    <ComponentTwo />
  </div>
</template>

<script setup lang="ts">
import ComponentOne from '@/components/ComponentOne.vue'
import ComponentTwo from '@/components/ComponentTwo.vue'
</script>

<style lang="scss" scoped>
.template {
  padding: 20px;
}
</style>
