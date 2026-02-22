<template>
    <div
         class="canvas-element"
         :class="[element.type, { 'selected': isSelected }]"
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
import { type TemplateElement } from '@/models/TemplateElement'
import {
    type ResizeHandle,
    calculateDragPosition,
    calculateResize,
} from '@/utils/canvasMouseHandleService'
import { HeadingElement, TextElement, ButtonElement, ImageElement, DividerElement } from '@/components/canvasElements'
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '@/store/TemplateCanvas'

const props = defineProps<{
    element: TemplateElement
    isSelected?: boolean
}>()

const emit = defineEmits<{
    select: []
    move: [position: { x: number, y: number }]
    resize: [size: { width: number, height: number }]
    delete: []
}>()

const elementComponent = computed(() => {
    const componentMap: Record<string, Component> = {
        heading: HeadingElement,
        text: TextElement,
        button: ButtonElement,
        image: ImageElement,
        divider: DividerElement,
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

        // Check if element is outside canvas after drag ends
        const finalX = props.element.x
        const finalY = props.element.y
        const centerX = finalX + props.element.width / 2
        const centerY = finalY + props.element.height / 2

        if (centerX < 0 || centerX > CANVAS_WIDTH || centerY < 0 || centerY > CANVAS_HEIGHT) {
            emit('delete')
        }
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

<style src="./CanvasElement.scss" lang="scss"></style>