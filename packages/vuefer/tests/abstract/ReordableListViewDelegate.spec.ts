import { ReordableListViewDelegate } from '../../lib/abstract/ReordableListViewDelegate'
describe('ReordableListViewDelegate', () => {
  test('can add new positions in y order', () => {
    const items = [
      { x: 0, y: 5, width: 2, height: 2, index: 1 },
      { x: 0, y: 4, width: 2, height: 2, index: 2 },
      { x: 0, y: 1, width: 2, height: 2, index: 3 },
      { x: 0, y: 2, width: 2, height: 2, index: 4 },
    ]
    const delegate = new ReordableListViewDelegate({ gridViewItems: [] })
    // filling delegate
    for (const el of items) {
      delegate.addUpdate({
        widget: {},
        position: el,
      })
    }
    expect(delegate.reactVal.map((el) => el.position)).toEqual([
      { x: 0, y: 1, width: 2, height: 2, index: 3 },
      { x: 0, y: 2, width: 2, height: 2, index: 4 },
      { x: 0, y: 5, width: 2, height: 2, index: 1 },
      { x: 0, y: 4, width: 2, height: 2, index: 2 },
    ])
  })
})
