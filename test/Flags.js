import { expect } from '@dimensionalpocket/development'
import { Flags } from '../src/Flags.js'

describe('Flags', function () {
  const FLAG_ONE = 1
  const FLAG_TWO = 2
  const FLAG_THREE = 4
  const FLAG_FOUR = 8

  describe('#enable', function () {
    it('enables a flag', function () {
      const flags = new Flags()

      expect(flags.check(FLAG_ONE)).to.eq(false)
      expect(flags.check(FLAG_TWO)).to.eq(false)
      expect(flags.check(FLAG_THREE)).to.eq(false)

      flags.enable(FLAG_ONE)

      expect(flags.check(FLAG_ONE)).to.eq(true)
      expect(flags.check(FLAG_TWO)).to.eq(false)
      expect(flags.check(FLAG_THREE)).to.eq(false)

      flags.enable(FLAG_THREE)

      expect(flags.check(FLAG_ONE)).to.eq(true)
      expect(flags.check(FLAG_TWO)).to.eq(false)
      expect(flags.check(FLAG_THREE)).to.eq(true)

      flags.enable(FLAG_TWO)

      expect(flags.check(FLAG_ONE)).to.eq(true)
      expect(flags.check(FLAG_TWO)).to.eq(true)
      expect(flags.check(FLAG_THREE)).to.eq(true)

      // Repeated calls shouldn't change other flags
      flags.enable(FLAG_TWO)

      expect(flags.check(FLAG_ONE)).to.eq(true)
      expect(flags.check(FLAG_TWO)).to.eq(true)
      expect(flags.check(FLAG_THREE)).to.eq(true)
    })

    it('enables multiple flags via sum', function () {
      const flags = new Flags()

      flags.enable(FLAG_ONE + FLAG_THREE)

      expect(flags.check(FLAG_ONE)).to.eq(true)
      expect(flags.check(FLAG_TWO)).to.eq(false)
      expect(flags.check(FLAG_THREE)).to.eq(true)
    })
  })

  describe('#disable', function () {
    it('disables a flag', function () {
      const flags = new Flags()

      flags.enable(FLAG_ONE)
      flags.enable(FLAG_TWO)
      flags.enable(FLAG_THREE)

      expect(flags.check(FLAG_ONE)).to.eq(true)
      expect(flags.check(FLAG_TWO)).to.eq(true)
      expect(flags.check(FLAG_THREE)).to.eq(true)

      flags.disable(FLAG_TWO)

      expect(flags.check(FLAG_ONE)).to.eq(true)
      expect(flags.check(FLAG_TWO)).to.eq(false)
      expect(flags.check(FLAG_THREE)).to.eq(true)

      // Disable again
      flags.disable(FLAG_TWO)

      expect(flags.check(FLAG_ONE)).to.eq(true)
      expect(flags.check(FLAG_TWO)).to.eq(false)
      expect(flags.check(FLAG_THREE)).to.eq(true)

      flags.disable(FLAG_ONE)

      expect(flags.check(FLAG_ONE)).to.eq(false)
      expect(flags.check(FLAG_TWO)).to.eq(false)
      expect(flags.check(FLAG_THREE)).to.eq(true)

      flags.disable(FLAG_THREE)

      expect(flags.check(FLAG_ONE)).to.eq(false)
      expect(flags.check(FLAG_TWO)).to.eq(false)
      expect(flags.check(FLAG_THREE)).to.eq(false)
    })

    it('disables multiple flags via sum', function () {
      const flags = new Flags()

      flags.enable(FLAG_ONE + FLAG_TWO + FLAG_THREE)
      flags.disable(FLAG_TWO + FLAG_THREE)

      expect(flags.check(FLAG_ONE)).to.eq(true)
      expect(flags.check(FLAG_TWO)).to.eq(false)
      expect(flags.check(FLAG_THREE)).to.eq(false)
    })
  })

  describe('#list', function () {
    it('returns the list of powers of two', function () {
      const flags = new Flags()

      flags.enable(FLAG_TWO)
      flags.enable(FLAG_FOUR)

      var expectation = new Int32Array([FLAG_TWO, FLAG_FOUR])

      expect(flags.list()).to.eql(expectation)
      expect(flags.list()).to.eql(expectation) // cache hit
    })

    it('returns an empty array when value is zero', function () {
      const flags = new Flags()

      var expectation = new Int32Array()

      expect(flags.list()).to.eql(expectation)
      expect(flags.list()).to.eql(expectation) // cache hit
    })
  })
})
