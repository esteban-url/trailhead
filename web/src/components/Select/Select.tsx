const Select = ({
  children,
  defaultValue,
  label,
  name,
  onChange,
  ...rest
}: {
  children: React.ReactNode
  defaultValue?: string | number
  label?: string
  name: string
  onChange: React.ChangeEventHandler<HTMLElement>
  [x: string]: unknown
}) => {
  const handleChange = (event) => {
    onChange(event)
  }
  return (
    <div {...rest}>
      {label ? (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      ) : null}
      <select
        onChange={handleChange}
        id={name}
        name={name}
        className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        defaultValue={defaultValue}
      >
        {children}
      </select>
    </div>
  )
}

export default Select
