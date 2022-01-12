import Navigation from 'src/components/Navigation/Navigation'

type PublicLayoutProps = {
  children?: React.ReactNode
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <>
      <Navigation />
      <main className="px-10 pt-5">{children}</main>
    </>
  )
}

export default PublicLayout
