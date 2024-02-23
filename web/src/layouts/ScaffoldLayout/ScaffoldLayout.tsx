import { Link, useParams, routes } from '@redwoodjs/router'
import { useQuery } from '@redwoodjs/web'
import { Toaster } from '@redwoodjs/web/toast'

const GET_TENANT = gql`
  query GetTenantBySlug($slug: String!) {
    tenantBySlug(slug: $slug) {
      id
      name
      slug
    }
  }
`
type LayoutProps = {
  title: string
  titleTo: string
  buttonLabel: string
  buttonTo: string
  children: React.ReactNode
}

const ScaffoldLayout = ({
  title,
  titleTo,
  buttonLabel,
  buttonTo,
  children,
}: LayoutProps) => {
  const { tenantSlug } = useParams()

  const { data, loading, error } = useQuery(GET_TENANT, {
    variables: { slug: tenantSlug },
  })
  const linkParams: { tenantSlug?: string } = {}
  if (tenantSlug) {
    linkParams.tenantSlug = tenantSlug
    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (!data.tenantBySlug) {
      return <div>No tenant found</div>
    }
  }
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes[titleTo](linkParams)} className="rw-link">
            {title}
          </Link>
        </h1>
        <Link
          to={routes[buttonTo](linkParams)}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> {buttonLabel}
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default ScaffoldLayout
