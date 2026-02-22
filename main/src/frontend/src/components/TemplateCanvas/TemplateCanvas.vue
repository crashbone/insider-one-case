<template>
    <div ref="canvasRef" class="template-canvas"
         @mousedown.self="onCanvasClick">
        <!-- Render placed elements -->
        <CanvasElement v-for="element in store.elements" :key="element.id"
                       :element="element"
                       :style="{
                        left: element.x + 'px',
                        top: element.y + 'px',
                        width: element.width + 'px',
                        height: element.height + 'px',
                    }"
                       :is-selected="store.selectedElementId === element.id"
                       @select="selectElement(element.id)"
                       @move="moveElement(element.id, $event)"
                       @resize="resizeElement(element.id, $event)"
                       @delete="deleteElement(element.id)" />
    </div>
</template>

<script setup lang="ts">
import { useTemplateCanvasStore } from '@/store/TemplateCanvas'
import CanvasElement from '@/components/canvasElements/CanvasElement.vue'

const store = useTemplateCanvasStore()

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

function deleteElement(id: string) {
    store.removeElement(id)
}
</script>

<style src="./TemplateCanvas.scss" lang="scss" scoped></style>