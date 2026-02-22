import { BaseElement, BaseElementOptions } from "@/models/BaseElement";

export interface DividerElementOptions extends BaseElementOptions {
  color: string
}

export class DividerElement extends BaseElement {
  readonly type = 'divider' as const;
  color: string

  constructor(element: DividerElementOptions) {
    super(element)
    this.color = element.color
  }
}
