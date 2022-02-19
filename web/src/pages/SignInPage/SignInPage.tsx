import { Form, PasswordField, Submit, EmailField } from '@redwoodjs/forms'
import { MetaTags } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'
import { Link, navigate, routes } from '@redwoodjs/router'
import FormField from 'src/components/common/FormField/FormField'

const SignIn = () => {
  const { logIn } = useAuth()

  const [error, setError] = React.useState(null)

  const onSubmit = (data: { email: string; password: string }) => {
    setError(null)
    try {
      logIn(data).then((res) =>
        res?.error?.message
          ? setError(res.error.message)
          : navigate(routes.members())
      )
    } catch (error) {
      setError(error.message)
    }
  }
  return (
    <>
      <MetaTags title="Sign in" description="Sign in to your account" />

      <div className="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* <img
              className="w-auto h-12 mx-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-primary-600.svg"
              alt="Workflow"
            /> */}
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900 dark:text-gray-100">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 py-8 bg-white shadow dark:bg-gray-900 dark:shadow-gray-800 sm:rounded-lg sm:px-10">
            <Form className="space-y-6" onSubmit={onSubmit}>
              {error ? (
                <span className="block w-full p-2 text-center text-red-900 bg-red-300 rounded dark:bg-red-600/40 dark:text-red-100">
                  {error}
                </span>
              ) : null}
              <FormField
                as={EmailField}
                label="Email address"
                name="email"
                autoComplete="email"
                required
              />
              <FormField
                as={PasswordField}
                label="Password"
                name="password"
                autoComplete="current-password"
                required
              />

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link
                    to="#"
                    className="font-medium text-primary-600 hover:text-primary-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <div>
                <Submit className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2">
                  Sign in
                </Submit>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn
