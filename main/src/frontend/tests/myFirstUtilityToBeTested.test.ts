import { myFirstUtilityToBeTested } from '../src/utils/myFirstUtilityToBeTested'

describe('myFirstUtilityToBeTested', () => {
  test('should return 99', () => {
    const result = myFirstUtilityToBeTested()
    expect(result).toBe(99)
  })
})
