type AdminLayoutProps = {
  children?: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <>
      <div className="px-10 py-4 -mx-10 -mt-5 bg-stone-600 text-stone-50">
        Admin
      </div>
      {children}
    </>
  )
}

export default AdminLayout
