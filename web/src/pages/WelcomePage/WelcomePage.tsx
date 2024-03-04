import { Metadata } from '@redwoodjs/web'

import WelcomeCell from 'src/components/WelcomeCell'

const WelcomePage = ({ id }) => {
  return (
    <>
      <Metadata title="Welcome" description="Welcome page" />

      <h1>WelcomePage</h1>

      <WelcomeCell id={id} />
    </>
  )
}

export default WelcomePage
