import { calculateResize, type Rect } from '../src/utils/canvasMouseHandleService'

describe('calculateResize', () => {
  const rect: Rect = { x: 100, y: 100, width: 100, height: 100 }
  const minSize = { w: 40, h: 20 }

  test('bottom-right: increases width and height', () => {
    expect(calculateResize('bottom-right', 50, 50, rect, minSize))
      .toEqual({ x: 100, y: 100, width: 150, height: 150 })
  })

  test('bottom-left: decreases x, increases width, increases height', () => {
    expect(calculateResize('bottom-left', -50, 50, rect, minSize))
      .toEqual({ x: 50, y: 100, width: 150, height: 150 })
  })

  test('top-right: increases width, decreases y, increases height', () => {
    expect(calculateResize('top-right', 50, -50, rect, minSize))
      .toEqual({ x: 100, y: 50, width: 150, height: 150 })
  })

  test('top-left: decreases x and y, increases width and height', () => {
    expect(calculateResize('top-left', -50, -50, rect, minSize))
      .toEqual({ x: 50, y: 50, width: 150, height: 150 })
  })

  test('respects minimum size', () => {
    const result = calculateResize('bottom-right', -80, -90, rect, minSize)
    expect(result.width).toBe(minSize.w)
    expect(result.height).toBe(minSize.h)
  })
})
