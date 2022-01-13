import { Form, TextField, PasswordField, Submit } from '@redwoodjs/forms'
import { MetaTags } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'

const SignUpPage = () => {
  const { signUp } = useAuth()

  const [error, setError] = React.useState(null)
  const [signupComplete, setSignupComplete] = React.useState(false)

  const onSubmit = (data) => {
    setError(null)
    try {
      signUp({ email: data.email, password: data.password }).then((res) => {
        if (res?.error?.message) {
          setError(res.error.message)
        } else {
          setSignupComplete(true)
        }
      })
    } catch (error) {
      error?.message && setError(error.message)
    }
  }
  return (
    <>
      <MetaTags title="SignUp" description="SignUp page" />

      <h1>Sign Up</h1>
      {signupComplete ? (
        <p className="w-1/2 p-2 mt-4">
          Thanks for signing up! We&apos;ve sent you an email, please click on
          the link on that link to confirm your email address.
        </p>
      ) : (
        <Form
          className="flex flex-col w-1/4 mt-4 space-y-4"
          onSubmit={onSubmit}
        >
          {error && (
            <span className="p-2 text-center text-red-900 bg-red-300 rounded dark:bg-red-400/90">
              {error}
            </span>
          )}
          <TextField
            className="p-2 border-2 border-gray-100 rounded dark:border-dark-700 dark:bg-dark-800 dark:text-dark-400 dark:placeholder-dark-700"
            name="email"
            placeholder="email"
          />
          <PasswordField
            className="p-2 border-2 border-gray-100 rounded dark:border-dark-700 dark:bg-dark-800 dark:text-dark-400 dark:placeholder-dark-700"
            name="password"
            placeholder="password"
          />
          <Submit className="p-2 rounded bg-primary-600 text-stone-50 dark:text-stone-200 dark:bg-primary-700">
            Sign Up
          </Submit>
        </Form>
      )}
    </>
  )
}

export default SignUpPage
