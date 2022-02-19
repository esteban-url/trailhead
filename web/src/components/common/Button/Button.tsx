import { Submit as RwSubmit } from '@redwoodjs/forms'
import { Link } from '@redwoodjs/router'

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

const commonClasses = `inline-flex items-center border border-transparent shadow-sm text-white font-medium focus:outline-none focus:ring-2 ring-offset-current focus:ring-offset-2 `
const variantClasses = {
  primary:
    'focus:ring-primary-500 bg-primary-600 hover:bg-primary-700 dark:bg-primary-800 dark:hover:bg-primary-700',
  basic:
    'focus:ring-primary-500 bg-white dark:bg-gray-600 hover:bg-gray-50 border border-gray-300 text-gray-700 dark:text-gray-800',
  delete:
    'text-red-700 dark:text-red-300 bg-red-100 bg-red-800 hover:bg-red-200 dark:hover:bg-red-900 focus:ring-red-500 focus:ring-red-900',
}
const sizeClasses = {
  xs: ' px-2.5 py-1.5 text-xs rounded',
  sm: ' px-3 py-2 text-sm leading-4 rounded-md',
  md: ' px-4 py-2 text-sm rounded-md',
  lg: ' px-4 py-2 text-base rounded-md',
  xl: ' px-6 py-3 text-base rounded-md',
}

type ButtonProps = {
  size?: string
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'basic' | 'delete'
  to?: string
  children?: React.ReactNode
}
const Button = ({
  size = 'md',
  type = 'button',
  variant = 'basic',
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={classNames(
        commonClasses,
        variantClasses[variant],
        sizeClasses[size]
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
const Submit = ({
  size = 'md',
  variant = 'basic',
  children,
  ...rest
}: ButtonProps) => {
  return (
    <RwSubmit
      className={classNames(
        commonClasses,
        variantClasses[variant],
        sizeClasses[size]
      )}
      {...rest}
    >
      {children}
    </RwSubmit>
  )
}
const LinkButton = ({
  size = 'md',
  to,
  variant = 'basic',
  children,
  ...rest
}: ButtonProps) => {
  return (
    <Link
      to={to}
      className={classNames(
        commonClasses,
        variantClasses[variant],
        sizeClasses[size]
      )}
      {...rest}
    >
      {children}
    </Link>
  )
}

export { Button, LinkButton, Submit }
