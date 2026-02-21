<template>
    <div class="canvas-element" :class="[`state-${draggingState}`]">
        
        <div class="button style2">
            <div class="button-icon">H</div>
            <div class="button-text">Heading</div>
        </div>
    </div>
</template>

<script setup lang="ts">
export type CanvasElementDraggingState = 'no-dragging' | 'dragging-out-canvas' | 'dragging-in-canvas'

withDefaults(defineProps<{
    draggingState?: CanvasElementDraggingState
}>(), {
    draggingState: 'no-dragging'
})
</script>

<style lang="scss" scoped>
.canvas-element {
    &.state-no-dragging {
        opacity: 1;
    }

    &.state-dragging-out-canvas {
        opacity: 0.15;
    }

    &.state-dragging-in-canvas {
        opacity: 0.5;
    }
}
</style>
