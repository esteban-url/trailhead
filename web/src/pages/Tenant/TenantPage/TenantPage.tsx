import TenantCell from 'src/components/Tenant/TenantCell'

type TenantPageProps = {
  id: string
}

const TenantPage = ({ id }: TenantPageProps) => {
  return <TenantCell id={id} />
}

export default TenantPage
