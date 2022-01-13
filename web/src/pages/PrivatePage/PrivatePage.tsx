import { MetaTags } from '@redwoodjs/web'

const PrivatePage = () => {
  return (
    <>
      <MetaTags title="Private" description="Private page" />

      <h1 className="mb-8 text-xl font-extrabold">Private page</h1>
      <p>This page can only be accessed when you are logged in.</p>
    </>
  )
}

export default PrivatePage
