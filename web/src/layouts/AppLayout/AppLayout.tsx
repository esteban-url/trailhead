import { Link, routes, useParams } from '@redwoodjs/router'

type AppLayoutProps = {
  children?: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const { tenantSlug } = useParams()

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to={routes.home()}>Home</Link>
          </li>
          <li>
            <Link to={routes.tenants()}>Tenants</Link>
          </li>
          {tenantSlug ? (
            <>
              <li>
                <Link to={routes.users({ tenantSlug })}>Users</Link>
              </li>
              <li>
                <Link to={routes.announcements({ tenantSlug })}>
                  Announcements
                </Link>
              </li>
            </>
          ) : null}
        </ul>
      </nav>
      {children}
    </>
  )
}

export default AppLayout
