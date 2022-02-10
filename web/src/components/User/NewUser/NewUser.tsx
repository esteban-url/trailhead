import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import UserForm from 'src/components/User/UserForm'

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`

const CREATE_SUPABASE_USER_MUTATION = gql`
  mutation CreateSupabaseUserMutation($input: CreateSupabaseUserInput!) {
    createSupabaseUser(input: $input) {
      uuid
      email
    }
  }
`
const SIGNUP_SUPABASE_USER_MUTATION = gql`
  mutation SignUpSupabaseUserMutation($input: CreateSupabaseUserInput!) {
    signUpSupabaseUser(input: $input) {
      uuid
      email
    }
  }
`

const NewUser = () => {
  const [createUser, { loading, error }] = useMutation(CREATE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User created')
      navigate(routes.users())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const [createSupabaseUser, { loading: supaLoading, error: supaError }] =
    useMutation(SIGNUP_SUPABASE_USER_MUTATION, {
      onCompleted: () => {
        toast.success('Supabase user created')
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })

  const onSave = (input) => {
    try {
      createSupabaseUser({ variables: { input } }).then((res) => {
        if (res?.errors) {
          console.error(res?.errors)
          //setError(res.error.message)
        } else {
          const user = res.data.signUpSupabaseUser

          createUser({
            variables: {
              input: {
                uuid: user.uuid,
                email: user.email,
              },
            },
          })
        }
      })
    } catch (error) {
      console.error(error)
      // error?.message //&& setError(error.message)
    }
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New user</h2>
      </header>
      <div className="rw-segment-main">
        <UserForm
          onSave={onSave}
          loading={loading || supaLoading}
          error={error || supaError}
          buttonLabel="New user"
        />
      </div>
    </div>
  )
}

export default NewUser
