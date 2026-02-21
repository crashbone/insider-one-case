<template>
    <div ref="canvasRef" class="template-canvas"
         @mouseenter="onCanvasEnter"
         @mouseleave="onCanvasLeave">
        <!-- Render placed elements -->
        <div v-for="element in store.elements" :key="element.id"
             class="canvas-element-wrapper"
             :style="{
                left: element.x + 'px',
                top: element.y + 'px',
            }">
            <CanvasElement />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTemplateCanvasStore } from '@/store/TemplateCanvas'
import CanvasElement from '@/components/CanvasElement/CanvasElement.vue'

const store = useTemplateCanvasStore()

const canvasRef = ref<HTMLElement | null>(null)

function onCanvasEnter() {
    console.log('Entered canvas')
}

function onCanvasLeave() {
    console.log('Left canvas')
}
</script>

<style src="./TemplateCanvas.scss" lang="scss" scoped></style>