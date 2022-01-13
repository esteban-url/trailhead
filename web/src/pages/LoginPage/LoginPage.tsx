import { Form, TextField, PasswordField, Submit } from '@redwoodjs/forms'
import { MetaTags } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'

const LoginPage = () => {
  const { logIn } = useAuth()

  const [error, setError] = React.useState(null)

  const onSubmit = (data: { email: string; password: string }) => {
    setError(null)
    try {
      logIn(data).then((res) =>
        res?.error?.message
          ? setError(res.error.message)
          : navigate(routes.private())
      )
    } catch (error) {
      setError(error.message)
    }
  }
  return (
    <>
      <MetaTags title="Login" description="Login page" />

      <h1>Login</h1>
      <Form className="flex flex-col w-1/4 mt-4 space-y-4" onSubmit={onSubmit}>
        {error && (
          <span className="p-2 text-center text-red-900 bg-red-300 rounded">
            {error}
          </span>
        )}
        <TextField
          className="p-2 border-2 border-gray-100 rounded"
          name="email"
          placeholder="email"
        />
        <PasswordField
          className="p-2 border-2 border-gray-100 rounded"
          name="password"
          placeholder="password"
        />
        <Submit className="p-2 bg-gray-200 rounded">Sign In</Submit>
      </Form>
    </>
  )
}

export default LoginPage
