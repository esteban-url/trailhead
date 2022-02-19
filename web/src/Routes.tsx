// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set, Private } from '@redwoodjs/router'
import UserRolesLayout from 'src/layouts/UserRolesLayout'
import UsersLayout from 'src/layouts/UsersLayout'
import AdminLayout from './layouts/AdminLayout/AdminLayout'
import PublicLayout from './layouts/PublicLayout/PublicLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={[PublicLayout]}>
        <Private unauthenticated="members" role={['admin']}>
          <Set wrap={[AdminLayout]}>
            <Set wrap={UserRolesLayout}>
              <Route path="/user-roles/new" page={UserRoleNewUserRolePage} name="newUserRole" />
              <Route path="/user-roles/{id:Int}/edit" page={UserRoleEditUserRolePage} name="editUserRole" />
              <Route path="/user-roles/{id:Int}" page={UserRoleUserRolePage} name="userRole" />
              <Route path="/user-roles" page={UserRoleUserRolesPage} name="userRoles" />
            </Set>
            <Set wrap={UsersLayout}>
              <Route path="/users/new" page={UserNewUserPage} name="newUser" />
              <Route path="/users/{id:Int}/edit" page={UserEditUserPage} name="editUser" />
              <Route path="/users/{id:Int}" page={UserUserPage} name="user" />
              <Route path="/users" page={UserUsersPage} name="users" />
            </Set>
          </Set>
        </Private>
        <Route path="/sign-up" page={SignUpPage} name="signUp" />
        <Route path="/sign-in" page={SignInPage} name="signIn" />
        <Private unauthenticated="signIn">
          <Route path="/members" page={MembersPage} name="members" />
        </Private>
        <Route path="/" page={HomePage} name="home" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
