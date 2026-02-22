import { BaseElement, BaseElementOptions } from "@/models/BaseElement";

export type AlignmentOptions = 'left' | 'center' | 'right'

export interface TextBasedElementOptions extends BaseElementOptions {
  content: string
  fontSize: number
  color: string
  alignment: AlignmentOptions
}

export abstract class TextBasedElement extends BaseElement {
  abstract override readonly type: 'heading' | 'text'
  content: string
  fontSize: number
  color: string
  alignment: AlignmentOptions
  constructor(element: TextBasedElementOptions) {
    super(element)
    this.content = element.content
    this.fontSize = element.fontSize
    this.color = element.color
    this.alignment = element.alignment
  }
}

export class TextElement extends TextBasedElement {
  readonly type = 'text' as const;
  constructor(element: TextBasedElementOptions) {
    super({
      ...element,
      type: 'text',
    })
  }
}
export class HeadingElement extends TextBasedElement {
  readonly type = 'heading' as const;
  constructor(element: TextBasedElementOptions) {
    super({
      ...element,
      type: 'heading',
    })
  }
}