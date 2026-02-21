<template>
    <div class="page template">
        <div class="top-bar flex-row">
            <div class="top-bar-left grow">
                <div class="page-title">Interactive Template Builder</div>
            </div>
            <div class="top-bar-right flex-row">
                <div class="button style1">
                    <div class="button-icon"></div>
                    <div class="button-text">Undo</div>
                </div>

                <div class="button style1">
                    <div class="button-icon"></div>
                    <div class="button-text">Redo</div>
                </div>
            </div>
        </div>
        <div class="center">
            <div class="left-bar">
                <div class="elements-container">
                    <div class="sub-title">ELEMENTS</div>
                    <template v-for="el in [
                        {
                            'letter': 'H',
                            'name': 'Heading'
                        },
                        {
                            'letter': 'T',
                            'name': 'Text'
                        },
                        {
                            'letter': '□',
                            'name': 'Button'
                        },
                        {
                            'letter': '▣',
                            'name': 'Image'
                        },
                        {
                            'letter': '—',
                            'name': 'Divider'
                        }
                    ]">
                        <div ref="elementRefs" class="button style2 draggable-element"
                            @mousedown="startDrag($event, el)">
                            <div class="button-icon">{{ el.letter }}</div>
                            <div class="button-text">{{ el.name }}</div>
                        </div>
                    </template>
                </div>
            </div>
            <div class="template-canvas-container">
                <TemplateCanvas />
            </div>
            <div class="right-properties">

            </div>
        </div>
        <div class="bottom-bar flex-row">
            <div class="button style1">
                <div class="button-icon"></div>
                <div class="button-text">New</div>
            </div>
            <div class="button style1">
                <div class="button-icon"></div>
                <div class="button-text">Save</div>
            </div>
            <div class="button style1">
                <div class="button-icon"></div>
                <div class="button-text">Export JSON</div>
            </div>
        </div>

        <!-- Drag preview - cloned button element -->
        <div v-if="isDragging" ref="dragPreviewRef"
             class="drag-preview"
             :style="{
                left: previewPosition.x + 'px',
                top: previewPosition.y + 'px',
            }">

            <CanvasElement :dragging-state="isInCanvas ? 'dragging-in-canvas' : 'dragging-out-canvas'" />
        </div>

        <ComponentOne />
        <ComponentTwo />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ComponentOne from '@/components/ComponentOne.vue'
import ComponentTwo from '@/components/ComponentTwo.vue'
import TemplateCanvas from '@/components/TemplateCanvas/TemplateCanvas.vue'
import CanvasElement from '@/components/CanvasElement/CanvasElement.vue'
import { useTemplateCanvasStore } from '@/store/TemplateCanvas'

const store = useTemplateCanvasStore()

const elementRefs = ref<HTMLElement[]>([])
const dragPreviewRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const isInCanvas = ref(false)
const previewPosition = ref({ x: 0, y: 0 })

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

function checkCanvasCollision(pos: { x: number, y: number }) {
    const canvasRect = getCanvasRect()
    if (!canvasRect) {
        isInCanvas.value = false
        return
    }

    const previewCenterX = pos.x + 20
    const previewCenterY = pos.y + 10

    isInCanvas.value = (
        previewCenterX >= canvasRect.left &&
        previewCenterX <= canvasRect.right &&
        previewCenterY >= canvasRect.top &&
        previewCenterY <= canvasRect.bottom
    )
}

function startDrag(event: MouseEvent, _element: { letter: string, name: string }) {
    isDragging.value = true
    isInCanvas.value = false

    previewPosition.value = {
        x: event.clientX - 20,
        y: event.clientY - 10,
    }

    document.addEventListener('mousemove', onDrag)
    document.addEventListener('mouseup', onDragEnd)
}

function onDrag(event: MouseEvent) {
    if (!isDragging.value) return

    previewPosition.value = {
        x: event.clientX - 20,
        y: event.clientY - 10,
    }

    checkCanvasCollision(previewPosition.value)
}

function onDragEnd(event: MouseEvent) {
    isDragging.value = false

    if (isInCanvas.value) {
        const canvasPos = getCanvasRelativePosition(event.clientX, event.clientY)
        if (canvasPos) {
            store.addElement({
                x: canvasPos.x - 20,
                y: canvasPos.y - 10,
            })
        }
    }

    document.removeEventListener('mousemove', onDrag)
    document.removeEventListener('mouseup', onDragEnd)
}
</script>
<style src="./Template.scss" lang="scss"></style>
