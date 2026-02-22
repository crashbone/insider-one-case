<template>
    <div class="page template">
        <div class="top-bar flex-row">
            <div class="top-bar-left grow">
                <div class="page-title">Interactive Template Builder</div>
            </div>
            <div class="top-bar-right flex-row">
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
                        {
                            'letter': 'H',
                            'name': 'Heading',
                            'type': 'heading' as const
                        },
                        {
                            'letter': 'T',
                            'name': 'Text',
                            'type': 'text' as const
                        },
                        {
                            'letter': '□',
                            'name': 'Button',
                            'type': 'button' as const
                        },
                        {
                            'letter': '▣',
                            'name': 'Image',
                            'type': 'image' as const
                        }
                    ]">
                        <InsiderButton
                            variant="style2"
                            :iconText="el.letter"
                            :text="el.name"
                            class="draggable-element"
                            @mousedown="startDrag($event, el)"
                        />
                    </template>
                    </div>
                </div>
            </div>
            <div class="template-canvas-container">
                <TemplateCanvas />
            </div>
            <div class="right-properties">

            </div>
        </div>
        <div class="bottom-bar flex-row">
            <InsiderButton variant="style1" text="New" />
            <InsiderButton variant="style1" text="Save" />
            <InsiderButton variant="style1" text="Export JSON" />
        </div>

        <!-- Drag preview - cloned button element -->
        <div v-if="isDragging" ref="dragPreviewRef"
             class="drag-preview"
             :style="{
                left: previewPosition.x + 'px',
                top: previewPosition.y + 'px',
            }">

            <CanvasElementComp :dragging-state="isInCanvas ? 'dragging-in-canvas' : 'dragging-out-canvas'" :element="dragPreviewElement" />
        </div>

        <ComponentOne />
        <ComponentTwo />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import ComponentOne from '@/components/ComponentOne.vue'
import ComponentTwo from '@/components/ComponentTwo.vue'
import TemplateCanvas from '@/components/TemplateCanvas/TemplateCanvas.vue'
import CanvasElementComp from '@/components/canvasElements/CanvasElement.vue'
import InsiderButton from '@/components/insiderButtons/InsiderButton.vue'
import { useTemplateCanvasStore, type ElementType, type CanvasElement, type TextBasedElement } from '@/store/TemplateCanvas'

const store = useTemplateCanvasStore()

const dragPreviewRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const isInCanvas = ref(false)
const previewPosition = ref({ x: 0, y: 0 })
const draggedElementType = ref<{ letter: string, name: string, type: ElementType } | null>(null)

const dragPreviewElement = computed((): CanvasElement => {
    const type: ElementType = draggedElementType.value?.type || 'heading'
    const base = {
        id: 'preview',
        x: 0,
        y: 0,
        width: type === 'button' ? 100 : 120,
        height: type === 'image' ? 100 : 40,
    }

    if (type === 'heading' || type === 'text') {
        return { 
            ...base, 
            type: type as 'heading' | 'text', 
            content: type === 'heading' ? 'Heading' : 'Text content', 
            fontSize: type === 'heading' ? 18 : 14, 
            color: '#000000', 
            alignment: 'left' as const 
        } satisfies TextBasedElement
    }
    if (type === 'button') {
        return { 
            ...base, 
            type: 'button' as const, 
            text: 'Button', 
            backgroundColor: '#4a90d9', 
            textColor: '#ffffff', 
            borderRadius: 4 
        }
    }
    // type === 'image'
    return { 
        ...base, 
        type: 'image' as const, 
        url: 'https://via.placeholder.com/120x100', 
        altText: 'Image' 
    }
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

function checkCanvasCollision(pos: { x: number, y: number }) {
    const canvasRect = getCanvasRect()
    if (!canvasRect) {
        isInCanvas.value = false
        return
    }

    const previewCenterX = pos.x + 60
    const previewCenterY = pos.y + 20

    isInCanvas.value = (
        previewCenterX >= canvasRect.left &&
        previewCenterX <= canvasRect.right &&
        previewCenterY >= canvasRect.top &&
        previewCenterY <= canvasRect.bottom
    )
}

function startDrag(event: MouseEvent, element: { letter: string, name: string, type: ElementType }) {
    isDragging.value = true
    isInCanvas.value = false
    draggedElementType.value = element

    previewPosition.value = {
        x: event.clientX - 60,
        y: event.clientY - 20,
    }

    document.addEventListener('mousemove', onDrag)
    document.addEventListener('mouseup', onDragEnd)
}

function onDrag(event: MouseEvent) {
    if (!isDragging.value) return

    previewPosition.value = {
        x: event.clientX - 60,
        y: event.clientY - 20,
    }

    checkCanvasCollision(previewPosition.value)
}

function generateId(): string {
    return `el-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

function onDragEnd(event: MouseEvent) {
    isDragging.value = false

    if (isInCanvas.value && draggedElementType.value) {
        const canvasPos = getCanvasRelativePosition(event.clientX, event.clientY)
        if (canvasPos) {
            const type = draggedElementType.value.type
            const baseProps = {
                id: generateId(),
                x: Math.max(0, canvasPos.x - 60),
                y: Math.max(0, canvasPos.y - 20),
                width: type === 'button' ? 100 : 120,
                height: type === 'image' ? 100 : 40,
            }
            
            if (type === 'heading' || type === 'text') {
                store.addElement({
                    ...baseProps,
                    type: type as 'heading' | 'text',
                    content: type === 'heading' ? 'Heading' : 'Text content',
                    fontSize: type === 'heading' ? 18 : 14,
                    color: '#000000',
                    alignment: 'left' as const
                } satisfies TextBasedElement)
            } else if (type === 'button') {
                store.addElement({
                    ...baseProps,
                    type: 'button' as const,
                    text: 'Button',
                    backgroundColor: '#4a90d9',
                    textColor: '#ffffff',
                    borderRadius: 4
                })
            } else if (type === 'image') {
                store.addElement({
                    ...baseProps,
                    type: 'image' as const,
                    url: 'https://via.placeholder.com/120x100',
                    altText: 'Image'
                })
            }
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
