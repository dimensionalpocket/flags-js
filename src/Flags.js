export class Flags {
  constructor () {
    /**
     * @type {number}
     */
    this.value = 0
  }

  /**
   * Activates a flag.
   *
   * @param {number} flag
   */
  enable (flag) {
    this.value |= flag
  }

  /**
   * Deactivates a flag.
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
}
