import { MetaTags } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <h1 className="mb-8 text-2xl font-extrabold">Welcome!</h1>
      <p>This is the home page</p>
    </>
  )
}

export default HomePage
