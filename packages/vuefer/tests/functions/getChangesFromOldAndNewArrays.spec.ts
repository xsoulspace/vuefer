import { getChangesFromOldAndNewArrays } from '../../lib/functions'

describe('getChangesFromOldAndNewArrays', () => {
  it('get changed', () => {
    const newArr: { i: number; x: number }[] = [
      { i: 0, x: 0 },
      { x: 1, i: 1 },
    ]
    const oldArr: { i: number; x: number }[] = [
      { i: 0, x: 1 },
      { x: 2, i: 2 },
    ]
    const result = getChangesFromOldAndNewArrays({
      newArr,
      oldArr,
      idPropertyName: 'i',
    })
    expect(result).toEqual({
      created: [newArr[1]],
      updated: [newArr[0]],
      removed: [oldArr[1]],
    })
  })
})
