const Footer = () => {
  return (
    <footer className="bg-gray-50" aria-labelledby="footerHeading">
      <h2 id="footerHeading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-md py-12 px-4 sm:max-w-7xl sm:px-6 lg:py-16 lg:px-8">
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-right text-base text-gray-400 xl:text-center">
            Trailhead. {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
