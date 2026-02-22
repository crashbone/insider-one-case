import { TemplateElement } from '@/models/TemplateElement'
import { defineStore } from 'pinia'

export type CanvasElementDraggingState = 'no-dragging' | 'dragging-out-canvas' | 'dragging-in-canvas'
export type { ElementType } from '@/models/BaseElement'

export const CANVAS_WIDTH = 400
export const CANVAS_HEIGHT = 500

export const useTemplateCanvasStore = defineStore('templateCanvas', {
  state: () => ({
    elements: [] as TemplateElement[],
    selectedElementId: null as string | null,
  }),
  getters: {
    selectedElement: (state) => {
      return state.elements.find(el => el.id === state.selectedElementId) || null
    },
  },
  actions: {
    addElement(element: TemplateElement) {
      this.elements.push(element)
    },
    removeElement(id: string) {
      this.elements = this.elements.filter(el => el.id !== id)
      if (this.selectedElementId === id) {
        this.selectedElementId = null
      }
    },
    updateElement(id: string, updates: Partial<TemplateElement>) {
      const index = this.elements.findIndex(el => el.id === id)
      if (index !== -1) {
        this.elements[index] = { ...this.elements[index], ...updates } as TemplateElement
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
    isElementInCanvas(element: TemplateElement): boolean {
      const elementCenterX = element.x + element.width / 2
      const elementCenterY = element.y + element.height / 2

      return (
        elementCenterX >= 0 &&
        elementCenterX <= CANVAS_WIDTH &&
        elementCenterY >= 0 &&
        elementCenterY <= CANVAS_HEIGHT
      )
    },
  },
})
