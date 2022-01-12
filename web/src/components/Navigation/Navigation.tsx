import { Link, routes } from '@redwoodjs/router'

const Navigation = () => {
  return (
    <div className="bg-slate-800 text-slate-50 px-10 py-5 flex space-x-4">
      <Link to={routes.home()}>Home</Link>
      <Link to={routes.private()}>Private</Link>
      <Link to={routes.signUp()}>Sign Up</Link>
      <Link to={routes.login()}>Login</Link>
    </div>
  )
}

export default Navigation
