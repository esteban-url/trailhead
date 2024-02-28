import { Form, Submit, TextField } from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const SignupPage = ({ code }) => {
  const { logIn } = useAuth()

  const onSignUp = async (data) => {
    //determine if phone or email
    if (data.identifier.includes('@')) {
      await logIn({ authMethod: 'otp', email: data.identifier })
      navigate(routes.verify({ type: 'email', identifier: data.identifier }))
    } else {
      await logIn({ authMethod: 'otp', phone: data.identifier })
      navigate(routes.verify({ type: 'sms', identifier: data.identifier }))
    }
  }

  return (
    <>
      <Metadata title="Signup" description="Signup page" />
      <div className="mx-auto w-full max-w-xs">
        <Form
          className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
          onSubmit={onSignUp}
        >
          {!code ? (
            <TextField
              className="mb-4 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow"
              placeholder="Invitation code"
              name="code"
              required
            />
          ) : null}
          <TextField
            className="mb-4 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow"
            placeholder="Name"
            name="name"
          />
          <TextField
            className="mb-6 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow"
            placeholder="Phone Number or email"
            name="identifier"
          />
          <div className="flex items-center justify-between">
            <Submit className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none">
              Sign up
            </Submit>
          </div>
        </Form>
      </div>
    </>
  )
}

export default SignupPage
