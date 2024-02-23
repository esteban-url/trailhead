import type {
  EditAnnouncementById,
  UpdateAnnouncementInput,
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

type FormAnnouncement = NonNullable<EditAnnouncementById['announcement']>

interface AnnouncementFormProps {
  announcement?: EditAnnouncementById['announcement']
  onSave: (data: UpdateAnnouncementInput, id?: FormAnnouncement['id']) => void
  error: RWGqlError
  loading: boolean
}

const AnnouncementForm = (props: AnnouncementFormProps) => {
  const onSubmit = (data: FormAnnouncement) => {
    props.onSave(data, props?.announcement?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormAnnouncement> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="tenantId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Tenant id
        </Label>

        <TextField
          name="tenantId"
          defaultValue={props.announcement?.tenantId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="tenantId" className="rw-field-error" />

        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>

        <TextField
          name="userId"
          defaultValue={props.announcement?.userId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="userId" className="rw-field-error" />

        <Label
          name="message"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Message
        </Label>

        <TextField
          name="message"
          defaultValue={props.announcement?.message}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="message" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default AnnouncementForm
