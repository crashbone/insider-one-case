import { BaseElement, BaseElementOptions } from "@/models/BaseElement";

export interface ImageElementOptions extends BaseElementOptions {
  url: string
  altText: string
}

export class ImageElement extends BaseElement {
  readonly type = 'image' as const;
  url: string
  altText: string

  constructor(element: ImageElementOptions) {
    super(element)
    this.url = element.url
    this.altText = element.altText
  }
}