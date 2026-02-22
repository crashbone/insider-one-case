export interface Position {
  x: number
  y: number
}

export interface Size {
  width: number
  height: number
}

export interface Rect extends Position, Size {}

export type ResizeHandle = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export interface DragState {
  startX: number
  startY: number
  startElX: number
  startElY: number
}

export interface ResizeState {
  startX: number
  startY: number
  startRect: Rect
}

export function calculateResize(
  handle: ResizeHandle,
  deltaX: number,
  deltaY: number,
  startRect: Rect,
  minSize: { w: number; h: number } = { w: 1, h: 1 }
): Rect {
  // Copy original values
  let { x, y, width, height } = { ...startRect }

  // HORIZONTAL CALCULATION (Width and X)
  if (handle === 'top-right' || handle === 'bottom-right') {
    // Right edge drag only changes width
    width = Math.max(minSize.w, startRect.width + deltaX)
  } else {
    // Left edge drag (top-left or bottom-left) also changes X
    const newWidth = Math.max(minSize.w, startRect.width - deltaX)
    x = startRect.x + (startRect.width - newWidth)
    width = newWidth
  }

  // VERTICAL CALCULATION (Height and Y)
  if (handle === 'bottom-left' || handle === 'bottom-right') {
    // Bottom edge drag only changes height
    height = Math.max(minSize.h, startRect.height + deltaY)
  } else {
    // Top edge drag (top-left or top-right) also changes Y
    const newHeight = Math.max(minSize.h, startRect.height - deltaY)
    y = startRect.y + (startRect.height - newHeight)
    height = newHeight
  }

  return { x, y, width, height }
}

export function calculateDragPosition(
  startX: number,
  startY: number,
  startElX: number,
  startElY: number,
  currentX: number,
  currentY: number
): Position {
  const dx = currentX - startX
  const dy = currentY - startY
  return { x: startElX + dx, y: startElY + dy }
}

export function setupDragHandlers(
  onMove: (position: Position) => void
): () => void {
  function onMouseMove(e: MouseEvent) {
    onMove({ x: e.clientX, y: e.clientY })
  }

  function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)

  return () => {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }
}

export function setupResizeHandlers(
  onMove: (size: Size) => void
): () => void {
  function onMouseMove(e: MouseEvent) {
    onMove({ width: e.clientX, height: e.clientY })
  }

  function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)

  return () => {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }
}
