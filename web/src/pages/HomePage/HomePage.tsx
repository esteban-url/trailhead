import { MetaTags } from '@redwoodjs/web'
import {
  ArchiveIcon,
  CloudUploadIcon,
  CogIcon,
  ServerIcon,
} from '@heroicons/react/outline'
import { ExternalLinkIcon, MoonIcon, UsersIcon } from '@heroicons/react/solid'
import Footer from 'src/components/Footer/Footer'
import TopNav from 'src/components/TopNav/TopNav'

const features = [
  {
    name: 'Deploy to Netlify',
    description:
      'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi vitae lobortis.',
    icon: CloudUploadIcon,
  },
  {
    name: 'User and role management',
    description:
      'Let users sign up and sign in, create and delete new users. A sign roles to your users to control the access to different parts of your application',
    icon: UsersIcon,
  },
  {
    name: 'Database Ready',
    description:
      'Your app is already set up to use with supabase, add your credentials and you are done.',
    icon: ServerIcon,
  },
  {
    name: 'File Storage',
    description:
      "We've taken care of all the wiring. Use the storage service to manage your files in the cloud. *Comming soon.",
    icon: ArchiveIcon,
  },
  {
    name: 'Super charged generators',
    description:
      'Redwood provides great generators to create CRUD pages in no time. We go farther by adding sorting, search, paging and a more streamlined UI/UX',
    icon: CogIcon,
  },

  {
    name: 'Dark mode',
    description:
      'Dark mode is already taken care of in all the built in components and generators. Add your own styling as you go along.',
    icon: MoonIcon,
  },
]

const HomePage = () => {
  return (
    <>
      <MetaTags
        title="Trailhead"
        description="Trailhead is a Redwood app starter with even more opinions."
      />

      <div className="bg-white">
        <div className="relative overflow-hidden">
          <main>
            <header className={`relative bg-gray-800`}>
              <div className="absolute inset-0">
                <img
                  className="h-full w-full object-cover"
                  src="https://source.unsplash.com/1600x900/?trees,nature,trails,mountains"
                  alt=""
                />
                <div
                  className="absolute inset-0 bg-neutral-700"
                  style={{ mixBlendMode: 'multiply' }}
                  aria-hidden="true"
                />
              </div>
              <TopNav style="transparent" />
              <div className="relative mx-auto max-w-md px-4 pt-24 pb-32 sm:px-6 md:max-w-3xl lg:max-w-7xl lg:px-8">
                {/* <a
                  href="#"
                  className="inline-flex items-center rounded-full bg-black p-1 pr-2 text-white hover:text-gray-200 sm:text-base lg:text-sm xl:text-base"
                >
                  <span className="from-primary-500 to-secondary-600 rounded-full bg-gradient-to-r px-3 py-0.5 text-xs font-semibold uppercase leading-5 tracking-wide text-white">
                    We're hiring
                  </span>
                  <span className="ml-4 text-sm">Visit our careers page</span>
                  <ChevronRightIcon
                    className="ml-2 h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
                </a> */}
                <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                  <span className="block">Hit the ground running</span> with{' '}
                  <span className="from-primary-200 to-secondary-400  bg-gradient-to-r bg-clip-text pb-3 text-transparent sm:pb-5">
                    Trailhead
                  </span>
                </h1>
                <p className="text-base text-gray-300 sm:text-xl lg:text-lg xl:text-xl">
                  Trailhead is a Redwood app starter with even more opinions.
                  <br />
                  So you can focus on building and publish your app faster.
                </p>
                <div className="mt-10 sm:mt-12">
                  <div className="mx-0">
                    <div className="sm:flex">
                      <div className="mt-3 sm:mt-0">
                        <button
                          type="submit"
                          className="bg-primary-500 hover:bg-primary-600 focus:ring-primary-300 block w-full rounded-md py-3 px-4 font-medium text-white shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900"
                        >
                          Check out the live demo!
                        </button>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-gray-300 sm:mt-4">
                      email: <span className="font-bold">admin@admin.com</span>
                      <br />
                      password: <span className="font-bold">trailhead</span>
                    </p>
                  </div>
                </div>
              </div>
            </header>

            {/* Testimonial section */}

            {/* Feature section with grid */}
            <div className="relative bg-white py-16 sm:py-24 lg:py-32">
              <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-secondary-600 text-base font-semibold uppercase tracking-wider">
                  Get going quickly
                </h2>
                <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  Batteries included
                </p>
                <p className="mx-auto mt-5 max-w-prose text-xl text-gray-500">
                  With supabase and netlify already integrated, plus the amazing
                  features from redwoodjs, you dont have to worry about bringing
                  services together. Start building your app right away.
                </p>
                <div className="mt-12">
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature) => (
                      <div key={feature.name} className="pt-6">
                        <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
                          <div className="-mt-6">
                            <div>
                              <span className="from-primary-500 to-secondary-600 inline-flex items-center justify-center rounded-md bg-gradient-to-r p-3 shadow-lg">
                                <feature.icon
                                  className="h-6 w-6 text-white"
                                  aria-hidden="true"
                                />
                              </span>
                            </div>
                            <h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900">
                              {feature.name}
                            </h3>
                            <p className="mt-5 text-base text-gray-500">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* CTA Section */}
            <div className="relative bg-gray-900">
              <div className="bg-primary-600 relative h-56 sm:h-72 md:absolute md:left-0 md:h-full md:w-1/2">
                <img
                  className="h-full w-full object-cover"
                  src="https://source.unsplash.com/collection/6770420/1200x900"
                  alt=""
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-r from-neutral-500 to-neutral-600 mix-blend-multiply"
                />
              </div>
              <div className="relative mx-auto max-w-md px-4 py-12 sm:max-w-7xl sm:px-6 sm:py-20 md:py-28 lg:px-8 lg:py-32">
                <div className="md:ml-auto md:w-1/2 md:pl-10">
                  <h2 className="text-base font-semibold uppercase tracking-wider text-gray-300">
                    Pull Requests welcomed
                  </h2>
                  <p className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                    Trailhead is open source!
                  </p>
                  <p className="mt-3 text-lg text-gray-300">
                    Let&apos;s make this a great starting point for all our
                    future apps. It&apos;s open sourced so you can help building
                    it and making it better for everyone.
                  </p>
                  <div className="mt-8">
                    <div className="inline-flex rounded-md shadow">
                      <a
                        href="https://github.com/esteban-url/trailhead"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-gray-900 hover:bg-gray-50"
                      >
                        Visit the Github repo
                        <ExternalLinkIcon
                          className="-mr-1 ml-3 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default HomePage
