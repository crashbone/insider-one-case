<template>
    <div class="page template">
        <div class="top-bar flex-row">
            <div class="top-bar-left grow">
                <div class="page-title">Interactive Template Builder</div>
            </div>
            <div class="top-bar-right flex-row">
                <div class="justify-center">NOT ENOUGH TIME / NOT IMPLEMENTED</div>
                <InsiderButton variant="style1" :iconText="'↶'" text="Undo" />
                <InsiderButton variant="style1" :iconText="'↷'" text="Redo" />
            </div>
        </div>
        <div class="center">
            <div class="left-bar">
                <div class="elements-container">
                    <div class="sub-title">ELEMENTS</div>
                    <div class="elements">
                        <template v-for="el in [
                            { icon: 'H', label: 'Heading', type: 'heading' as const },
                            { icon: 'T', label: 'Text', type: 'text' as const },
                            { icon: '□', label: 'Button', type: 'button' as const },
                            { icon: '▣', label: 'Image', type: 'image' as const },
                            { icon: '—', label: 'Divider', type: 'divider' as const }
                        ]">
                            <InsiderButton
                                variant="style2"
                                :icon-text="el.icon"
                                :text="el.label"
                                class="draggable-element"
                                @mousedown="startDrag($event, el.type)"
                            />
                        </template>
                    </div>
                </div>
            </div>
            <div class="template-canvas-container">
                <TemplateCanvas />
            </div>
            <div class="right-properties justify-center align-center text-center">
                NOT ENOUGH TIME / NOT IMPLEMENTED
            </div>
        </div>
        <div class="bottom-bar flex-row align-center text-center"">
            <div>NOT ENOUGH TIME / NOT IMPLEMENTED</div>
            <InsiderButton variant="style1" icon-text="+" text="New" />
            <InsiderButton variant="style1" text="Save" />
            <InsiderButton variant="style1" text="Export JSON" />
        </div>

        <!-- Drag preview - cloned button element -->
        <CanvasElement v-if="isDragging"
                        :class="`${canvasElementDraggingState} test`"
                       :element="dragPreviewElement"
                       :style="{
                        left: previewPosition.x + 'px',
                        top: previewPosition.y + 'px',
                        width: dragPreviewElement.width + 'px',
                        height: dragPreviewElement.height + 'px',
                    }" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import TemplateCanvas from '@/components/TemplateCanvas/TemplateCanvas.vue'
import CanvasElement from '@/components/canvasElements/CanvasElement.vue'
import InsiderButton from '@/components/insiderButtons/InsiderButton.vue'
import { useTemplateCanvasStore, type ElementType } from '@/store/TemplateCanvas'
import {
    DRAG_PREVIEW_OFFSET_X,
    DRAG_PREVIEW_OFFSET_Y,
    createDragPreviewElement,
    createInitialElement,
    generateId
} from '@/utils/initialElementGeneration'

const store = useTemplateCanvasStore()

type CanvasElementDraggingState = 'no-dragging' | 'dragging-out-canvas' | 'dragging-in-canvas'

const canvasElementDraggingState = computed((): CanvasElementDraggingState => {
    if (!isDragging.value) return 'no-dragging'

    return isPreviewInCanvas.value ? 'dragging-in-canvas' : 'dragging-out-canvas'
})

const isDragging = ref(false)
const previewPosition = ref({ x: 0, y: 0 })
const draggedElementType = ref<ElementType | null>(null)

const dragPreviewElement = computed(() => {
    const type: ElementType = draggedElementType.value?.type || 'heading'
    return createDragPreviewElement(type)
})

const isPreviewInCanvas = computed(() => {
    const canvasRect = getCanvasRect()
    if (!canvasRect) return false

    const elementLeft = previewPosition.value.x - canvasRect.left
    const elementTop = previewPosition.value.y - canvasRect.top
    const elementRight = elementLeft + dragPreviewElement.value.width
    const elementBottom = elementTop + dragPreviewElement.value.height

    // Element center must be inside canvas for valid drop
    const centerX = elementLeft + dragPreviewElement.value.width / 2
    const centerY = elementTop + dragPreviewElement.value.height / 2

    return (
        centerX >= 0 &&
        centerX <= canvasRect.width &&
        centerY >= 0 &&
        centerY <= canvasRect.height
    )
})

function getCanvasRect(): DOMRect | null {
    const canvas = document.querySelector('.template-canvas') as HTMLElement
    if (!canvas) return null
    return canvas.getBoundingClientRect()
}

function getCanvasRelativePosition(clientX: number, clientY: number): { x: number, y: number } | null {
    const canvasRect = getCanvasRect()
    if (!canvasRect) return null

    return {
        x: clientX - canvasRect.left,
        y: clientY - canvasRect.top,
    }
}

function startDrag(event: MouseEvent, type: ElementType) {
    isDragging.value = true
    draggedElementType.value = type

    previewPosition.value = {
        x: event.clientX - DRAG_PREVIEW_OFFSET_X,
        y: event.clientY - DRAG_PREVIEW_OFFSET_Y,
    }

    document.addEventListener('mousemove', onDrag)
    document.addEventListener('mouseup', onDragEnd)
}

function onDrag(event: MouseEvent) {
    if (!isDragging.value) return

    previewPosition.value = {
        x: event.clientX - DRAG_PREVIEW_OFFSET_X,
        y: event.clientY - DRAG_PREVIEW_OFFSET_Y,
    }
}

function onDragEnd(event: MouseEvent) {
    isDragging.value = false

    if (isPreviewInCanvas.value && draggedElementType.value) {
        const canvasPos = getCanvasRelativePosition(event.clientX, event.clientY)
        if (canvasPos) {
            const type = draggedElementType.value
            const x = Math.max(0, canvasPos.x - DRAG_PREVIEW_OFFSET_X)
            const y = Math.max(0, canvasPos.y - DRAG_PREVIEW_OFFSET_Y)
            const id = generateId()

            const newElement = createInitialElement(type, x, y, id)
            store.addElement(newElement)
            store.selectElement(id)
        }
    }

    draggedElementType.value = null

    document.removeEventListener('mousemove', onDrag)
    document.removeEventListener('mouseup', onDragEnd)
}

// Keyboard shortcuts
function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Delete' || event.key === 'Backspace') {
        // Don't delete if user is typing in an input
        if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
            return
        }

        if (store.selectedElementId) {
            store.removeElement(store.selectedElementId)
        }
    }
}

onMounted(() => {
    document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyDown)
})
</script>
<style src="./Template.scss" lang="scss"></style>
