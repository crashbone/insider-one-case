import { HeadingElement, TextElement, ButtonElement, ImageElement, DividerElement } from '@/models/TemplateElement'
import type { ElementType } from '@/store/TemplateCanvas'

// Canvas dimensions
export const CANVAS_WIDTH = 400
export const CANVAS_HEIGHT = 500

// Drag preview offsets
export const DRAG_PREVIEW_OFFSET_X = 60
export const DRAG_PREVIEW_OFFSET_Y = 20

// Default element dimensions
export const DEFAULT_HEADING_WIDTH = 120
export const DEFAULT_HEADING_HEIGHT = 40
export const DEFAULT_TEXT_WIDTH = 120
export const DEFAULT_TEXT_HEIGHT = 40
export const DEFAULT_BUTTON_WIDTH = 100
export const DEFAULT_BUTTON_HEIGHT = 40
export const DEFAULT_IMAGE_WIDTH = 120
export const DEFAULT_IMAGE_HEIGHT = 100
export const DEFAULT_DIVIDER_WIDTH = 260
export const DEFAULT_DIVIDER_HEIGHT = 2

// Default element styles
export const DEFAULT_HEADING_CONTENT = 'Heading'
export const DEFAULT_HEADING_FONT_SIZE = 18
export const DEFAULT_TEXT_CONTENT = 'Text content'
export const DEFAULT_TEXT_FONT_SIZE = 14
export const DEFAULT_COLOR = '#000000'
export const DEFAULT_ALIGNMENT = 'left' as const
export const DEFAULT_BUTTON_TEXT = 'Button'
export const DEFAULT_BUTTON_BACKGROUND_COLOR = '#4a90d9'
export const DEFAULT_BUTTON_TEXT_COLOR = '#ffffff'
export const DEFAULT_BUTTON_BORDER_RADIUS = 4
export const DEFAULT_IMAGE_URL = 'https://via.placeholder.com/120x100'
export const DEFAULT_IMAGE_ALT_TEXT = 'Image'
export const DEFAULT_DIVIDER_COLOR = '#DDDDDD'

// Element type metadata for palette
export const ELEMENT_PALETTE = [
    { letter: 'H', name: 'Heading', type: 'heading' as const },
    { letter: 'T', name: 'Text', type: 'text' as const },
    { letter: '□', name: 'Button', type: 'button' as const },
    { letter: '▣', name: 'Image', type: 'image' as const },
    { letter: '—', name: 'Divider', type: 'divider' as const }
]

export interface ElementBaseProps {
    id: string
    x: number
    y: number
    width: number
    height: number
}

export function getDefaultDimensions(type: ElementType): { width: number, height: number } {
    switch (type) {
        case 'heading':
            return { width: DEFAULT_HEADING_WIDTH, height: DEFAULT_HEADING_HEIGHT }
        case 'text':
            return { width: DEFAULT_TEXT_WIDTH, height: DEFAULT_TEXT_HEIGHT }
        case 'button':
            return { width: DEFAULT_BUTTON_WIDTH, height: DEFAULT_BUTTON_HEIGHT }
        case 'image':
            return { width: DEFAULT_IMAGE_WIDTH, height: DEFAULT_IMAGE_HEIGHT }
        case 'divider':
            return { width: DEFAULT_DIVIDER_WIDTH, height: DEFAULT_DIVIDER_HEIGHT }
    }
}

export function createInitialElement(type: ElementType, x: number, y: number, id: string) {
    const baseProps: ElementBaseProps = {
        id,
        x,
        y,
        ...getDefaultDimensions(type)
    }

    switch (type) {
        case 'heading':
            return new HeadingElement({
                ...baseProps,
                content: DEFAULT_HEADING_CONTENT,
                fontSize: DEFAULT_HEADING_FONT_SIZE,
                color: DEFAULT_COLOR,
                alignment: DEFAULT_ALIGNMENT
            })
        case 'text':
            return new TextElement({
                ...baseProps,
                content: DEFAULT_TEXT_CONTENT,
                fontSize: DEFAULT_TEXT_FONT_SIZE,
                color: DEFAULT_COLOR,
                alignment: DEFAULT_ALIGNMENT
            })
        case 'button':
            return new ButtonElement({
                ...baseProps,
                text: DEFAULT_BUTTON_TEXT,
                backgroundColor: DEFAULT_BUTTON_BACKGROUND_COLOR,
                textColor: DEFAULT_BUTTON_TEXT_COLOR,
                borderRadius: DEFAULT_BUTTON_BORDER_RADIUS
            })
        case 'image':
            return new ImageElement({
                ...baseProps,
                url: DEFAULT_IMAGE_URL,
                altText: DEFAULT_IMAGE_ALT_TEXT
            })
        case 'divider':
            return new DividerElement({
                ...baseProps,
                color: DEFAULT_DIVIDER_COLOR
            })
    }
}

export function createDragPreviewElement(type: ElementType) {
    const baseProps: Omit<ElementBaseProps, 'id' | 'x' | 'y'> = {
        ...getDefaultDimensions(type)
    }

    switch (type) {
        case 'heading':
            return new HeadingElement({
                id: 'preview',
                x: 0,
                y: 0,
                ...baseProps,
                content: DEFAULT_HEADING_CONTENT,
                fontSize: DEFAULT_HEADING_FONT_SIZE,
                color: DEFAULT_COLOR,
                alignment: DEFAULT_ALIGNMENT
            })
        case 'text':
            return new TextElement({
                id: 'preview',
                x: 0,
                y: 0,
                ...baseProps,
                content: DEFAULT_TEXT_CONTENT,
                fontSize: DEFAULT_TEXT_FONT_SIZE,
                color: DEFAULT_COLOR,
                alignment: DEFAULT_ALIGNMENT
            })
        case 'button':
            return new ButtonElement({
                id: 'preview',
                x: 0,
                y: 0,
                ...baseProps,
                text: DEFAULT_BUTTON_TEXT,
                backgroundColor: DEFAULT_BUTTON_BACKGROUND_COLOR,
                textColor: DEFAULT_BUTTON_TEXT_COLOR,
                borderRadius: DEFAULT_BUTTON_BORDER_RADIUS
            })
        case 'image':
            return new ImageElement({
                id: 'preview',
                x: 0,
                y: 0,
                ...baseProps,
                url: DEFAULT_IMAGE_URL,
                altText: DEFAULT_IMAGE_ALT_TEXT
            })
        case 'divider':
            return new DividerElement({
                id: 'preview',
                x: 0,
                y: 0,
                ...baseProps,
                color: DEFAULT_DIVIDER_COLOR
            })
    }
}

export function generateId(): string {
    return `el-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}
