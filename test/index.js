import { expect } from '@dimensionalpocket/development'
import Flags from '../index.js'
import { Flags as FlagsFromSrc } from '../src/Flags.js'

describe('main require', function () {
  it('exports Flags from src', function () {
    expect(Flags).to.equal(FlagsFromSrc)
  })
})
