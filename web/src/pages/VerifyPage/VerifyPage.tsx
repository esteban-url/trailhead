import { useState } from 'react'

import { Form, Submit, TextField } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const VerifyPage = ({ type, identifier }) => {
  const { client, getCurrentUser } = useAuth()
  const [error, setError] = useState(null)
  const onVerify = async (data) => {
    console.log('verify:', data)
    const response = await client.auth.verifyOtp({
      email: identifier,
      token: data.code,
      type,
    })
    if (response.error) {
      setError(response.error.message)
      console.error({ error: response.error })
      return
    }
    getCurrentUser()
    navigate(routes.home())
  }

  return (
    <>
      <Metadata title="Verify" description="Verify page" />

      <Form
        className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
        onSubmit={onVerify}
      >
        {error ? (
          <div
            className="relative mb-6 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        ) : null}
        <TextField
          className="mb-6 w-full  appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow"
          placeholder="Verification code"
          name="code"
          required
        />
        <div className="flex items-center justify-between">
          <Submit className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none">
            Verify
          </Submit>
        </div>
      </Form>
    </>
  )
}

export default VerifyPage
