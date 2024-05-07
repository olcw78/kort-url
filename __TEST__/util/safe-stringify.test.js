const safeStringify = require('../../src/util/safe-stringify')
const { describe, it, expect } = require('@jest/globals')

describe('safe-stringify', () => {
  it('should replace safely circular references with "[circular]"', () => {
    const circular1 = {
      name: 'john doe',
    }
    circular1.ref = circular1

    const res = JSON.parse(safeStringify(circular1))
    const exp = {
      name: 'john doe',
      ref: '[circular]',
    }

    expect(res).toEqual(exp)
  })
})
