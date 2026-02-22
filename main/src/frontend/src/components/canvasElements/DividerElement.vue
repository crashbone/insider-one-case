<template>
    <div class="canvas-element-content divider" :style="style">
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DividerElement } from '@/models/DividerElement'

const props = defineProps<{
    element: DividerElement
}>()

const style = computed(() => ({
    backgroundColor: props.element.color,
}))
</script>

<style src="./DividerElement.scss" lang="scss" scoped></style>
