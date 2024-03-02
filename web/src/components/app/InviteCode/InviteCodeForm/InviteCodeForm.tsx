import type {
  EditInviteCodeById,
  UpdateInviteCodeInput,
} from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

type FormInviteCode = NonNullable<EditInviteCodeById['inviteCode']>

interface InviteCodeFormProps {
  inviteCode?: EditInviteCodeById['inviteCode']
  onSave: (
    data: UpdateInviteCodeInput,
    id?: FormInviteCode['id']
  ) => void
  error: RWGqlError
  loading: boolean
}

const InviteCodeForm = (props: InviteCodeFormProps) => {
  const onSubmit = (data: FormInviteCode) => {
    props.onSave(data, props?.inviteCode?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormInviteCode> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default InviteCodeForm
