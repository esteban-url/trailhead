import { Link, navigate, routes, useParams } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

type PublicLayoutProps = {
  children?: React.ReactNode
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  const { tenantSlug } = useParams()

  const { currentUser, logOut } = useAuth()
  const onLogout = () => {
    logOut()
    navigate(routes.home())
  }
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to={routes.home()}>Trailhead</Link>
          </li>
          {currentUser ? (
            <>
              {tenantSlug ? (
                <li>
                  <Link to={routes.dashboard({ tenantSlug })}>
                    DashboardPage
                  </Link>
                </li>
              ) : null}
              <li>
                <span>
                  {`${
                    currentUser.email
                      ? currentUser.email
                      : currentUser.phone
                      ? currentUser.phone
                      : ''
                  }`}
                </span>
              </li>
              <li>
                <button onClick={onLogout}>Logout</button>
              </li>
            </>
          ) : (
            <li>
              <Link to={routes.signup()}>Signup</Link>
            </li>
          )}
        </ul>
      </nav>
      {children}
    </>
  )
}

export default PublicLayout
