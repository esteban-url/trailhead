import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { GlobeIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { Link, routes } from '@redwoodjs/router'
import { useRouterState } from '@redwoodjs/router/dist/router-context'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
]
const TopNav = ({
  style = 'solid',
}: {
  style: 'solid' | 'translucent' | 'transparent'
}) => {
  return (
    <Popover as="header" className="relative z-10">
      <div
        className={`${
          style === 'solid'
            ? 'bg-gray-900'
            : style === 'translucent'
            ? 'bg-gray-900/70'
            : ''
        } pt-6`}
      >
        <nav
          className="relative mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6"
          aria-label="Global"
        >
          <div className="flex flex-1 items-center">
            <div className="flex w-full items-center justify-between md:w-auto">
              <Link to={routes.home()} className="flex items-center">
                <GlobeIcon className="text-primary-600 h-8 w-auto sm:h-10" />
                <span className=" text-primary-50  ml-4 text-2xl font-extrabold">
                  Trailhead
                </span>
              </Link>
              <div className="-mr-2 flex items-center md:hidden">
                <Popover.Button className="focus-ring-inset inline-flex items-center justify-center rounded-md bg-gray-900 p-2 text-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="hidden space-x-8 md:ml-10 md:flex">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-base font-medium text-white hover:text-gray-300"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link
              to={routes.signIn()}
              className="text-base font-medium text-white hover:text-gray-300"
            >
              Log in
            </Link>
            <Link
              to={routes.signUp()}
              className="bg-primary-600 hover:bg-primary-700 inline-flex items-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white"
            >
              Sign up
            </Link>
          </div>
        </nav>
      </div>

      <Transition
        as={Fragment}
        enter="duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 origin-top transform p-2 transition md:hidden"
        >
          <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
            <div className="flex items-center justify-between px-5 pt-4">
              <div>
                <div className="flex items-center">
                  <GlobeIcon className="text-primary-600 h-8 w-auto sm:h-10" />
                  <span className=" text-primary-600  ml-4 text-2xl font-extrabold">
                    Trailhead
                  </span>
                </div>
              </div>
              <div className="-mr-2">
                <Popover.Button className="focus:ring-secondary-600 inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset">
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="pt-5 pb-6">
              <div className="space-y-1 px-2">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="mt-6 px-5">
                <a
                  href="#"
                  className="from-primary-500 to-secondary-600 hover:from-primary-600 hover:to-secondary-700 block w-full rounded-md bg-gradient-to-r py-3 px-4 text-center font-medium text-white shadow"
                >
                  Sign up
                </a>
              </div>
              <div className="mt-6 px-5">
                <p className="text-center text-base font-medium text-gray-500">
                  Existing customer?{' '}
                  <a href="#" className="text-gray-900 hover:underline">
                    Login
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}

export default TopNav
