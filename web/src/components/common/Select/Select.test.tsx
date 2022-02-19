import { render } from '@redwoodjs/testing/web'

import Select from './Select'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Select', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <Select
          {...{
            defaultValue: 'a',
            name: 'selectA',
            onChange: () => console.log('onChange'),
          }}
        >
          <option>a</option>
          <option>b</option>
          <option>c</option>
        </Select>
      )
    }).not.toThrow()
  })
})
