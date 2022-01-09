import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const PrivatePage = () => {
  return (
    <>
      <MetaTags title="Private" description="Private page" />

      <h1>PrivatePage</h1>
      <p>
        Find me in <code>./web/src/pages/PrivatePage/PrivatePage.tsx</code>
      </p>
      <p>
        My default route is named <code>private</code>, link to me with `
        <Link to={routes.private()}>Private</Link>`
      </p>
    </>
  )
}

export default PrivatePage
