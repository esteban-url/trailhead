import uID from './nanoId'
describe('uID', () => {
  it('should return a string of default length when no length is provided', () => {
    const id = uID()
    expect(typeof id).toBe('string')
    expect(id.length).toBe(13)
  })

  it('should return a string of specified length when length is provided', () => {
    const length = 10
    const id = uID(length)
    expect(typeof id).toBe('string')
    expect(id.length).toBe(length)
  })
})
