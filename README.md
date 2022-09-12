# @dimensionalpocket/flags

Bitwise flag management for Javascript.

## Usage

Create your flags as constants with values **in powers of two** then use them on a new `Flags` instance:

```js
import Flags from '@dimensionalpocket/flags'

const FLAG_ONE = 1
const FLAG_TWO = 2
const FLAG_THREE = 4

const flags = new Flags()

flags.check(FLAG_ONE) // => false
flags.enable(FLAG_ONE)
flags.check(FLAG_ONE) // => true
flags.disable(FLAG_ONE)
flags.check(FLAG_ONE) // => false

flags.check(FLAG_TWO) // => false
flags.enable(FLAG_TWO)
flags.check(FLAG_TWO) // => true
```

## License

MIT
