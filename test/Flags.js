import { expect } from '@dimensionalpocket/development'
import { Flags } from '../src/Flags.js'

describe('Flags', function () {
  const FLAG_ONE = 1
  const FLAG_TWO = 2
  const FLAG_THREE = 4

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

      flags.disable(FLAG_ONE)

      expect(flags.check(FLAG_ONE)).to.eq(false)
      expect(flags.check(FLAG_TWO)).to.eq(false)
      expect(flags.check(FLAG_THREE)).to.eq(true)

      flags.disable(FLAG_THREE)

      expect(flags.check(FLAG_ONE)).to.eq(false)
      expect(flags.check(FLAG_TWO)).to.eq(false)
      expect(flags.check(FLAG_THREE)).to.eq(false)
    })
  })
})