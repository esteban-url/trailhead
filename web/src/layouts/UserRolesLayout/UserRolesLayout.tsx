import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type UserRoleLayoutProps = {
  children: React.ReactNode
}

const UserRolesLayout = ({ children }: UserRoleLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.userRoles()}
            className="rw-link"
          >
            UserRoles
          </Link>
        </h1>
        <Link
          to={routes.newUserRole()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New UserRole
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default UserRolesLayout
