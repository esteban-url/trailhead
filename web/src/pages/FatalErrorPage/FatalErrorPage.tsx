// This page will be rendered when an error makes it all the way to the top of the
// application without being handled by a Javascript catch statement or React error
// boundary.
//
// You can modify this page as you wish, but it is important to keep things simple to
// avoid the possibility that it will cause its own error. If it does, Redwood will
// still render a generic error page, but your users will prefer something a bit more
// thoughtful. =)

import { GlobeIcon } from '@heroicons/react/outline'

// Ensures that production builds do not include the error page
let RedwoodDevFatalErrorPage = undefined
if (process.env.NODE_ENV === 'development') {
  RedwoodDevFatalErrorPage = require('@redwoodjs/web').DevFatalErrorPage
}

export default RedwoodDevFatalErrorPage ||
  (() => (
    <main className="flex min-h-full flex-col bg-white pt-16 pb-12 dark:bg-gray-900">
      <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-shrink-0 justify-center">
          <a href="/" className="inline-flex">
            <span className="sr-only">Trailhead</span>
            <GlobeIcon className="text-primary-600 dark:text-primary-800 w-24" />
          </a>
        </div>
        <div className="py-16">
          <div className="text-center">
            <p className="text-primary-600 dark:text-primary-800 text-sm font-semibold uppercase tracking-wide">
              Oh no!
            </p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-500 sm:text-5xl">
              Sorry, something is gone wrong.
            </h1>
            <p className="mt-2 text-base text-gray-500">
              Don&apos;t worry, it&apos;s not your fault.
            </p>
            <div className="mt-6">
              <a
                href="/"
                className="text-primary-600 dark:text-primary-800 hover:text-primary-500 text-base font-medium"
              >
                Go back home<span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </main>
      {/* <footer className="mx-auto w-full max-w-7xl flex-shrink-0 px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-center space-x-4">
          <a
            href="#"
            className="text-sm font-medium text-gray-500 hover:text-gray-600"
          >
            Contact Support
          </a>
          <span
            className="inline-block border-l border-gray-300"
            aria-hidden="true"
          />
          <a
            href="#"
            className="text-sm font-medium text-gray-500 hover:text-gray-600"
          >
            Status
          </a>
          <span
            className="inline-block border-l border-gray-300"
            aria-hidden="true"
          />
          <a
            href="#"
            className="text-sm font-medium text-gray-500 hover:text-gray-600"
          >
            Twitter
          </a>
        </nav>
      </footer> */}
    </main>
  ))
