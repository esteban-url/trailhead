// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import AppLayout from 'src/layouts/AppLayout'
import PublicLayout from 'src/layouts/PublicLayout'
import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import { useAuth } from './auth'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Set wrap={AppLayout}>
        <Set wrap={ScaffoldLayout} title="Tenants" titleTo="tenants" buttonLabel="New Tenant" buttonTo="newTenant">
          <Route path="/app/admin/tenants/new" page={AppAdminTenantNewTenantPage} name="newTenant" />
          <Route path="/app/admin/tenants/{id}/edit" page={AppAdminTenantEditTenantPage} name="editTenant" />
          <Route path="/app/admin/tenants/{id}" page={AppAdminTenantTenantPage} name="tenant" />
          <Route path="/app/admin/tenants" page={AppAdminTenantTenantsPage} name="tenants" />
        </Set>
        <Set wrap={ScaffoldLayout} title="Announcements" titleTo="announcements" buttonLabel="New Announcement" buttonTo="newAnnouncement">
          <Route path="/app/{tenantSlug}/announcements/new" page={AppAnnouncementNewAnnouncementPage} name="newAnnouncement" />
          <Route path="/app/{tenantSlug}/announcements/{id}/edit" page={AppAnnouncementEditAnnouncementPage} name="editAnnouncement" />
          <Route path="/app/{tenantSlug}/announcements/{id}" page={AppAnnouncementAnnouncementPage} name="announcement" />
          <Route path="/app/{tenantSlug}/announcements" page={AppAnnouncementAnnouncementsPage} name="announcements" />
        </Set>
        <Set wrap={ScaffoldLayout} title="Users" titleTo="users" buttonLabel="New User" buttonTo="newUser">
          <Route path="/app/{tenantSlug}/users/new" page={AppUserNewUserPage} name="newUser" />
          <Route path="/app/{tenantSlug}/users/{id}/edit" page={AppUserEditUserPage} name="editUser" />
          <Route path="/app/{tenantSlug}/users/{id}" page={AppUserUserPage} name="user" />
          <Route path="/app/{tenantSlug}/users" page={AppUserUsersPage} name="users" />
        </Set>
        <Set wrap={ScaffoldLayout} title="InviteCodes" titleTo="inviteCodes" buttonLabel="New InviteCode" buttonTo="newInviteCode">
          <Route path="/app/{tenantSlug}/invites/new" page={AppInviteCodeNewInviteCodePage} name="newInviteCode" />
          <Route path="/app/{tenantSlug}/invites/{id}/edit" page={AppInviteCodeEditInviteCodePage} name="editInviteCode" />
          <Route path="/app/{tenantSlug}/invites/{id}" page={AppInviteCodeInviteCodePage} name="inviteCode" />
          <Route path="/app/{tenantSlug}/invites" page={AppInviteCodeInviteCodesPage} name="inviteCodes" />
        </Set>
        <Route path="/app/{tenantSlug}" page={AppDashboardPage} name="dashboard" />
      </Set>
      <Set wrap={PublicLayout}>
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/signup/{code}" page={SignupPage} name="signupWithCode" />
        <Route path="/welcome/{id}" page={WelcomePage} name="welcome" />

        <Route path="/" page={HomePage} name="home" />
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
