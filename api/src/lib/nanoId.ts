import { customAlphabet } from 'nanoid'

// The alphabet used to generate the unique ID.
// use only uppercase letters and numbers to avoid confusion between similar characters,
// and make it easier to read, copy, and type.
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
// The default length of the unique ID to generate.
const length = 13

const nanoid = customAlphabet(alphabet, length)

/**
 * Generates a unique ID using the nanoid library.
 *
 * @param {number} [length] - Optional. The length of the ID to generate. If not provided, a default length defined by nanoid is used.
 * @returns {string} The generated unique ID.
 */
const uID = (length?: number) => {
  if (length) {
    return nanoid(length)
  }
  return nanoid()
}

export default uID
