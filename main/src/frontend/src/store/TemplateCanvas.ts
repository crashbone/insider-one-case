import { defineStore } from 'pinia'

export type CanvasElementDraggingState = 'no-dragging' | 'dragging-out-canvas' | 'dragging-in-canvas'

export type ElementType = 'heading' | 'text' | 'button' | 'image'

export interface BaseElement {
  id: string
  type: ElementType
  x: number
  y: number
  width: number
  height: number
}

export interface TextBasedElement extends BaseElement {
  type: 'heading' | 'text'
  content: string
  fontSize: number
  color: string
  alignment: 'left' | 'center' | 'right'
}

export interface ButtonElement extends BaseElement {
  type: 'button'
  text: string
  backgroundColor: string
  textColor: string
  borderRadius: number
}

export interface ImageElement extends BaseElement {
  type: 'image'
  url: string
  altText: string
}

export type CanvasElement = TextBasedElement | ButtonElement | ImageElement

export const useTemplateCanvasStore = defineStore('templateCanvas', {
  state: () => ({
    elements: [] as CanvasElement[],
    selectedElementId: null as string | null,
  }),
  getters: {
    selectedElement: (state) => {
      return state.elements.find(el => el.id === state.selectedElementId) || null
    },
  },
  actions: {
    addElement(element: CanvasElement) {
      this.elements.push(element)
    },
    removeElement(id: string) {
      this.elements = this.elements.filter(el => el.id !== id)
      if (this.selectedElementId === id) {
        this.selectedElementId = null
      }
    },
    updateElement(id: string, updates: Partial<CanvasElement>) {
      const index = this.elements.findIndex(el => el.id === id)
      if (index !== -1) {
        this.elements[index] = { ...this.elements[index], ...updates } as CanvasElement
      }
    },
    selectElement(id: string | null) {
      this.selectedElementId = id
    },
    moveElement(id: string, x: number, y: number) {
      const index = this.elements.findIndex(el => el.id === id)
      if (index !== -1) {
        this.elements[index].x = x
        this.elements[index].y = y
      }
    },
  },
})
