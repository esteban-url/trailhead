import Favicon from 'src/components/Favicon/Favicon'
import Navigation from 'src/components/Navigation/Navigation'

type PublicLayoutProps = {
  children?: React.ReactNode
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <>
      <Favicon />
      <Navigation />
      <main className="px-10 pt-5">{children}</main>
    </>
  )
}

export default PublicLayout
