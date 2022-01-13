import { Head } from '@redwoodjs/web'
const Favicon = () => {
  const icon = process.env.NODE_ENV === 'development' ? '🧢' : '🏞'
  return (
    <Head>
      <link
        rel="icon"
        href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${icon}</text></svg>`}
      />
    </Head>
  )
}

export default Favicon
