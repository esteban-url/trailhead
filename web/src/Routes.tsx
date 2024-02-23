// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import AppLayout from 'src/layouts/AppLayout/AppLayout'
import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={AppLayout}>
        <Set wrap={ScaffoldLayout} title="Tenants" titleTo="tenants" buttonLabel="New Tenant" buttonTo="newTenant">
          <Route path="/app/admin/tenants/new" page={TenantNewTenantPage} name="newTenant" />
          <Route path="/app/admin/tenants/{id}/edit" page={TenantEditTenantPage} name="editTenant" />
          <Route path="/app/admin/tenants/{id}" page={TenantTenantPage} name="tenant" />
          <Route path="/app/admin/tenants" page={TenantTenantsPage} name="tenants" />
        </Set>
        <Set wrap={ScaffoldLayout} title="Announcements" titleTo="announcements" buttonLabel="New Announcement" buttonTo="newAnnouncement">
          <Route path="/app/{tenantSlug}/announcements/new" page={AnnouncementNewAnnouncementPage} name="newAnnouncement" />
          <Route path="/app/{tenantSlug}/announcements/{id}/edit" page={AnnouncementEditAnnouncementPage} name="editAnnouncement" />
          <Route path="/app/{tenantSlug}/announcements/{id}" page={AnnouncementAnnouncementPage} name="announcement" />
          <Route path="/app/{tenantSlug}/announcements" page={AnnouncementAnnouncementsPage} name="announcements" />
        </Set>
        <Set wrap={ScaffoldLayout} title="Users" titleTo="users" buttonLabel="New User" buttonTo="newUser">
          <Route path="/app/{tenantSlug}/users/new" page={UserNewUserPage} name="newUser" />
          <Route path="/app/{tenantSlug}/users/{id}/edit" page={UserEditUserPage} name="editUser" />
          <Route path="/app/{tenantSlug}/users/{id}" page={UserUserPage} name="user" />
          <Route path="/app/{tenantSlug}/users" page={UserUsersPage} name="users" />
        </Set>
      </Set>
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
