<template>
    <div class="canvas-element-content button" :style="style">
        {{ element.text }}
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { type ButtonElement } from '@/models/ButtonElement'

const props = defineProps<{
    element: ButtonElement
}>()

const style = computed(() => ({
    backgroundColor: props.element.backgroundColor,
    color: props.element.textColor,
    borderRadius: `${props.element.borderRadius}px`,
}))
</script>

<style lang="scss" scoped>
.canvas-element-content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    white-space: nowrap;
    overflow: hidden;
}
</style>
