<template>
    <div ref="canvasRef" class="template-canvas"
         @mouseenter="onCanvasEnter"
         @mouseleave="onCanvasLeave"
         @mousedown.self="onCanvasClick">
        <!-- Render placed elements -->
        <div v-for="element in store.elements" :key="element.id"
             class="canvas-element-wrapper"
             :style="{
                left: element.x + 'px',
                top: element.y + 'px',
                width: element.width + 'px',
                height: element.height + 'px',
            }">
            <CanvasElement
                :element="element"
                :is-selected="store.selectedElementId === element.id"
                :dragging-state="draggingState"
                @select="selectElement(element.id)"
                @move="moveElement(element.id, $event)"
                @resize="resizeElement(element.id, $event)"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTemplateCanvasStore, type CanvasElementDraggingState } from '@/store/TemplateCanvas'
import CanvasElement from '@/components/canvasElements/CanvasElement.vue'

const store = useTemplateCanvasStore()

const canvasRef = ref<HTMLElement | null>(null)
const draggingState = ref<CanvasElementDraggingState>('no-dragging')

function onCanvasEnter() {
    draggingState.value = 'dragging-in-canvas'
}

function onCanvasLeave() {
    draggingState.value = 'dragging-out-canvas'
}

function onCanvasClick() {
    // Deselect when clicking on empty canvas area
    store.selectElement(null)
}

function selectElement(id: string) {
    store.selectElement(id)
}

function moveElement(id: string, position: { x: number, y: number }) {
    store.moveElement(id, position.x, position.y)
}

function resizeElement(id: string, size: { width: number, height: number }) {
    store.updateElement(id, { width: size.width, height: size.height } as Partial<typeof store.elements[number]>)
}
</script>

<style src="./TemplateCanvas.scss" lang="scss" scoped></style>