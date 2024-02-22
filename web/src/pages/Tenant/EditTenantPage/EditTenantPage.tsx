import EditTenantCell from 'src/components/Tenant/EditTenantCell'

type TenantPageProps = {
  id: string
}

const EditTenantPage = ({ id }: TenantPageProps) => {
  return <EditTenantCell id={id} />
}

export default EditTenantPage
