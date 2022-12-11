/**
 * Cached arrays of powers of two indexed by sum.
 *
 * @type {Map<number,Int32Array>}
 */
const cachedLists = new Map()

export class Flags {
  constructor () {
    /**
     * The sum of all active flags.
     *
     * @type {number}
     */
    this.value = 0
  }

  /**
   * Activates a flag.
   * Send a sum of flags to activate multiple at once.
   *
   * @param {number} flag
   */
  enable (flag) {
    this.value |= flag
  }

  /**
   * Deactivates a flag.
   * Send a sum of flags to deactivate multiple at once.
   *
   * @param {number} flag
   */
  disable (flag) {
    this.value &= ~flag
  }

  /**
   * Checks if a flag is active.
   *
   * @param {number} flag
   * @returns {boolean}
   */
  check (flag) {
    return (this.value & flag) === flag
  }

  /**
   * Returns the powers of two that sum up to the current value.
   *
   * @returns {Int32Array}
   */
  list () {
    const value = this.value

    // Hit cache first.
    const cachedList = cachedLists.get(value)
    if (cachedList) { return cachedList }

    const powers = []

    for (var currentPower = 1; currentPower !== 0; currentPower <<= 1) {
      if ((currentPower & value) !== 0) {
        powers.push(currentPower)
      }
    }

    // Atomically creates the cache copy as a fixed size and typed array.
    const cached = new Int32Array(powers)

    cachedLists.set(value, cached)

    return cached
  }
}
