import { Button, Submit } from './Button'

export const empty = () => {
  return (
    <>
      <Button />
    </>
  )
}

export const Buttons = () => {
  return (
    <>
      <div className="my-4">
        <h1 className="flex mb-2 text-2xl ">Basic</h1>
        <Button size="xl">Button</Button> <Button size="lg">Button</Button>{' '}
        <Button>Button</Button> <Button size="sm">Button</Button>{' '}
        <Button size="xs">Button</Button>
      </div>
      <div className="my-8">
        <h1 className="mb-2 text-2xl">Primary</h1>
        <Button variant="primary" size="xl">
          Button
        </Button>{' '}
        <Button variant="primary" size="lg">
          Button
        </Button>{' '}
        <Button variant="primary">Button</Button>{' '}
        <Button variant="primary" size="sm">
          Button
        </Button>{' '}
        <Button variant="primary" size="xs">
          Button
        </Button>
      </div>
      <div className="my-8">
        <h1 className="mb-2 text-2xl">Delete</h1>
        <Button size="xl" variant="delete">
          Button
        </Button>{' '}
        <Button size="lg" variant="delete">
          Button
        </Button>{' '}
        <Button variant="delete">Button</Button>{' '}
        <Button size="sm" variant="delete">
          Button
        </Button>{' '}
        <Button size="xs" variant="delete">
          Button
        </Button>
      </div>
    </>
  )
}

export const SubmitButton = () => {
  return (
    <>
      <Submit size="xl">Submit</Submit> <Submit size="lg">Submit</Submit>{' '}
      <Submit>Submit</Submit> <Submit size="sm">Submit</Submit>{' '}
      <Submit size="xs">Submit</Submit>
    </>
  )
}

export default { title: 'Components/Button' }
