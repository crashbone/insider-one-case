import { defineStore } from 'pinia'

export interface CanvasElement {
  id: string
  x: number
  y: number
}

export const useTemplateCanvasStore = defineStore('templateCanvas', {
  state: () => ({
    elements: [] as CanvasElement[],
  }),
  actions: {
    addElement(element: Omit<CanvasElement, 'id'>) {
      const id = `el-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
      this.elements.push({ ...element, id })
    },
    removeElement(id: string) {
      this.elements = this.elements.filter(el => el.id !== id)
    },
  },
})
