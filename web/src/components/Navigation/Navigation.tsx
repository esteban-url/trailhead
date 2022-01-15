import { useAuth } from '@redwoodjs/auth'
import { Link, navigate, routes } from '@redwoodjs/router'
import { ThemeToggle } from '../ThemeToggle/ThemeToggle'

const Navigation = () => {
  const { isAuthenticated, hasRole } = useAuth()

  return (
    <nav className="flex px-10 py-5 space-x-5 bg-primary-700 dark:bg-primary-900 text-primary-50">
      <Link className="font-bold" to={routes.home()}>
        Trailhead
      </Link>
      {hasRole('admin') ? <Link to={routes.users()}>Users</Link> : null}
      {isAuthenticated ? (
        <>
          <Link to={routes.members()}>Members</Link>
          <SignoutButton />
        </>
      ) : (
        <>
          <Link to={routes.login()}>Login</Link>
          <Link to={routes.signUp()}>Sign Up</Link>
        </>
      )}
      <div className="relative">
        <ThemeToggle />
      </div>
    </nav>
  )
}

const SignoutButton = () => {
  const { logOut } = useAuth()
  const onClick = () => {
    logOut().then(() => navigate(routes.home()))
  }

  return <button onClick={() => onClick()}>Sign Out</button>
}

export default Navigation
