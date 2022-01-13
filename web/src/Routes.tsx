// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set, Private } from '@redwoodjs/router'
import PublicLayout from './layouts/PublicLayout/PublicLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={[PublicLayout]}>
        <Route path="/sign-up" page={SignUpPage} name="signUp" />
        <Route path="/login" page={LoginPage} name="login" />
        <Private unauthenticated="login">
          <Route path="/private" page={PrivatePage} name="private" />
        </Private>
        <Route path="/" page={HomePage} name="home" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
