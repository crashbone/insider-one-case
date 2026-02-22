<template>
    <div
         class="canvas-element"
         :class="[`state-${draggingState}`, { 'selected': isSelected }]"
         @mousedown="onMouseDown">
        <component :is="elementComponent" :element="element" />

        <!-- Resize handles (only when selected) -->
        <template v-if="isSelected">
            <div class="resize-handle top-left" @mousedown.stop="handleResizeStart($event, 'top-left')"></div>
            <div class="resize-handle top-right" @mousedown.stop="handleResizeStart($event, 'top-right')"></div>
            <div class="resize-handle bottom-left" @mousedown.stop="handleResizeStart($event, 'bottom-left')"></div>
            <div class="resize-handle bottom-right" @mousedown.stop="handleResizeStart($event, 'bottom-right')"></div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'
import { type CanvasElement } from '@/store/TemplateCanvas'
import {
    type ResizeHandle,
    calculateDragPosition,
    calculateResize,
} from '@/utils/canvasMouseHandleService'
import { HeadingElement, TextElement, ButtonElement, ImageElement } from '@/components/canvasElements'

export type CanvasElementDraggingState = 'no-dragging' | 'dragging-out-canvas' | 'dragging-in-canvas'

const props = withDefaults(defineProps<{
    draggingState?: CanvasElementDraggingState
    element: CanvasElement
    isSelected?: boolean
}>(), {
    draggingState: 'no-dragging',
    isSelected: false
})

const emit = defineEmits<{
    select: []
    move: [position: { x: number, y: number }]
    resize: [size: { width: number, height: number }]
}>()

const elementComponent = computed(() => {
    const componentMap: Record<string, Component> = {
        heading: HeadingElement,
        text: TextElement,
        button: ButtonElement,
        image: ImageElement,
    }
    return componentMap[props.element.type]
})

function onMouseDown(event: MouseEvent) {
    event.stopPropagation()
    emit('select')
    handleDragStart(event)
}

function handleDragStart(event: MouseEvent) {
    const startX = event.clientX
    const startY = event.clientY
    const startElX = props.element.x
    const startElY = props.element.y

    function onMouseMove(e: MouseEvent) {
        const newPosition = calculateDragPosition(startX, startY, startElX, startElY, e.clientX, e.clientY)
        emit('move', newPosition)
    }

    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
}

function handleResizeStart(event: MouseEvent, handle: ResizeHandle) {
    const startX = event.clientX
    const startY = event.clientY
    const startRect = {
        x: props.element.x,
        y: props.element.y,
        width: props.element.width,
        height: props.element.height,
    }

    function onMouseMove(e: MouseEvent) {
        const dx = e.clientX - startX
        const dy = e.clientY - startY
        const newRect = calculateResize(handle, dx, dy, startRect)
        emit('move', { x: newRect.x, y: newRect.y })
        emit('resize', { width: newRect.width, height: newRect.height })
    }

    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
}
</script>

<style src="./CanvasElement.scss" lang="scss" scoped></style>