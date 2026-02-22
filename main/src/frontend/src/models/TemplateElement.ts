import { ButtonElement } from '@/models/ButtonElement'
import { ImageElement } from '@/models/ImageElement'
import { HeadingElement, TextElement } from '@/models/TextBasedElement'
import { DividerElement } from '@/models/DividerElement'

export type TemplateElement = HeadingElement | TextElement | ButtonElement | ImageElement | DividerElement

export { HeadingElement, TextElement, ButtonElement, ImageElement, DividerElement }