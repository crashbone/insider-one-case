export type ElementType = 'heading' | 'text' | 'button' | 'image' | 'divider'

export interface BaseElementOptions {
  id: string
  x: number
  y: number
  width: number
  height: number
}

export abstract class BaseElement implements BaseElement {
  id: string
  abstract readonly type: ElementType
  x: number
  y: number
  width: number
  height: number

  constructor(element: BaseElementOptions) {
    this.id = element.id
    this.x = element.x
    this.y = element.y
    this.width = element.width
    this.height = element.height
  }
}