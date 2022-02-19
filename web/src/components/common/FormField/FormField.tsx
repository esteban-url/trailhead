import { FieldError, Label } from '@redwoodjs/forms'
const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}
type FormFieldProps<P = unknown> = {
  as: React.ComponentType<P> | React.ElementType
  name: string
  label: string
  register?: unknown
  validation?: unknown
  className?: string
  children?: React.ReactNode
  [x: string]: unknown //enables ...rest
} & P

const FormField = ({
  as: As,
  name,
  label,
  register,
  validation,
  className,
  children,
  ...rest
}: FormFieldProps) => {
  return (
    <>
      <div className={`${className ? className : 'sm:col-span-6 '}`}>
        <Label
          name={name}
          className="block text-sm font-medium text-gray-700 dark:text-gray-400"
          errorClassName=""
        >
          {label}
        </Label>
        <div className="mt-1">
          {children ? (
            children
          ) : (
            <>
              <As
                name={name}
                className={classNames(
                  'block w-full px-3 py-2',
                  'appearance-none rounded-md border border-gray-300 placeholder-gray-400 shadow-sm',
                  ' focus:border-primary-500 focus:ring-primary-500 focus:outline-none sm:text-sm',
                  'dark:focus:border-primary-500 dark:focus:ring-primary-500 ',
                  'dark:bg-gray-800 dark:text-gray-400',
                  'dark:border-gray-600 dark:placeholder-gray-700'
                )}
                errorClassName={classNames(
                  'block w-full pr-10 border-red-300 text-red-900',
                  ' placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md'
                )}
                ref={register}
                validation={validation}
                {...rest}
              />
              <FieldError name={name} className="" />
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default FormField
