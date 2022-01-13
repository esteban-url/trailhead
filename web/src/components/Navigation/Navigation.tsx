import { useAuth } from '@redwoodjs/auth'
import { Link, navigate, routes } from '@redwoodjs/router'

const Navigation = () => {
  const { isAuthenticated } = useAuth()
  return (
    <nav className="flex px-10 py-5 space-x-5 bg-primary-700 text-primary-50">
      <Link className="font-bold" to={routes.home()}>
        Trailhead
      </Link>

      {isAuthenticated ? (
        <>
          <Link to={routes.private()}>Private</Link>
          <SignoutButton />
        </>
      ) : (
        <>
          <Link to={routes.login()}>Login</Link>
          <Link to={routes.signUp()}>Sign Up</Link>
        </>
      )}
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
