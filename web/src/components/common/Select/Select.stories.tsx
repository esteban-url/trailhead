import Select from './Select'

export const generated = () => {
  return (
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
}

export default { title: 'Components/Select' }
