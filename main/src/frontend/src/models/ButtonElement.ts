import { BaseElement, BaseElementOptions } from "@/models/BaseElement";

export interface ButtonElementOptions extends BaseElementOptions {
  text: string
  backgroundColor: string
  textColor: string
  borderRadius: number
}

export class ButtonElement extends BaseElement {
  readonly type = 'button' as const;
  text: string
  backgroundColor: string
  textColor: string
  borderRadius: number

  constructor(element: ButtonElementOptions) {
    super(element)
    this.text = element.text
    this.backgroundColor = element.backgroundColor
    this.textColor = element.textColor
    this.borderRadius = element.borderRadius
  }
}