/**
 * Minimum size for canvas elements during resize
 */
export const MIN_SIZE = 50

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

/**
 * Calculates the new size and position during resize operation based on handle position and mouse movement
 * When resizing from top or left edges, the position also changes to keep the opposite edge fixed
 * @param handle - The resize handle being dragged
 * @param deltaX - Mouse movement delta X
 * @param deltaY - Mouse movement delta Y
 * @param startRect - Initial rectangle with x, y, width, height
 * @param minSize - Minimum size object with w and h properties
 * @returns New rectangle object with x, y, width, height
 */
export function calculateResize(
  handle: ResizeHandle,
  deltaX: number,
  deltaY: number,
  startRect: Rect,
  minSize: { w: number; h: number } = { w: MIN_SIZE, h: MIN_SIZE }
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

/**
 * Calculates the new position during drag operation
 * @param startX - Initial mouse X position
 * @param startY - Initial mouse Y position
 * @param startElX - Initial element X position
 * @param startElY - Initial element Y position
 * @param currentX - Current mouse X position
 * @param currentY - Current mouse Y position
 * @returns New position object with x and y
 */
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

/**
 * Sets up mouse event listeners for drag operation
 * @param onMove - Callback function called on mouse move with new position
 * @returns Cleanup function to remove event listeners
 */
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

/**
 * Sets up mouse event listeners for resize operation
 * @param onMove - Callback function called on mouse move with new size
 * @returns Cleanup function to remove event listeners
 */
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
