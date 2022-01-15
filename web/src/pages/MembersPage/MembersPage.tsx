import { MetaTags } from '@redwoodjs/web'

const MembersPage = () => {
  return (
    <>
      <MetaTags title="Members" description="Members page" />

      <h1 className="mb-8 text-2xl font-extrabold">Members Page</h1>
      <p>this page is only accesible to logged in members</p>
    </>
  )
}

export default MembersPage
