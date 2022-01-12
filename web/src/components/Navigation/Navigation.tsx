import { Link, routes } from '@redwoodjs/router'

const Navigation = () => {
  return (
    <div className="bg-primary-700 text-primary-50  px-10 py-5 flex space-x-5">
      <Link className="font-bold" to={routes.home()}>
        Trailhead
      </Link>
      <Link to={routes.private()}>Private</Link>
      <Link to={routes.signUp()}>Sign Up</Link>
      <Link to={routes.login()}>Login</Link>
    </div>
  )
}

export default Navigation
