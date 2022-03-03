import { useAuth } from '@redwoodjs/auth'
import { Link, navigate, routes } from '@redwoodjs/router'
import { ThemeToggle } from '../ThemeToggle/ThemeToggle'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { PlusSmIcon } from '@heroicons/react/solid'
const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]
const Navigation = () => {
  const { isAuthenticated, hasRole } = useAuth()

  return (
    <nav className="bg-primary-700 dark:bg-primary-900 text-primary-50 flex space-x-5 px-10 py-5">
      <Link className="font-bold" to={routes.home()}>
        Trailhead
      </Link>
      {hasRole('admin') ? <Link to={routes.users()}>Users</Link> : null}
      {isAuthenticated ? (
        <>
          <Link to={routes.members()}>Members</Link>``
          <SignoutButton />
        </>
      ) : (
        <>
          <Link to={routes.signIn()}>Login</Link>
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
