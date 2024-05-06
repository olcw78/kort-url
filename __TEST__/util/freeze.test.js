'use strict'
const { expect } = require('@jest/globals')
const freezeRecursive = require('../../src/util/freeze')

describe('freeze', () => {
  it('should freeze recursively down to the bottom of all the objects', () => {
    const james = {
      name: 'james',
      age: 25,
      family: [
        {
          name: 'carter',
          age: 54,
        },
        {
          name: 'margarette',
          age: 52,
        },
        {
          name: 'nicky',
          age: 21,
          boyfriend: {
            name: 'jimin',
            age: 27,
          },
        },
      ],
    }

    const res = freezeRecursive(james)
    console.log(res)

    expect(res).not.toBeFalsy()

    expect(() => {
      'use strict'
      res.age = 27
      console.log(res)
    }).toThrowError()

    expect(() => {
      'use strict'
      res.family[0][2].bodyfried.name = 'can'
      console.log(res)
    }).toThrowError()
  })
})
