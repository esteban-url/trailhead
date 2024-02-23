import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import AnnouncementBoardCell from 'src/components/app/Announcement/AnnouncementBoardCell'

type DashboardPageProps = {
  tenantSlug: string
}
const DashboardPage = ({ tenantSlug }: DashboardPageProps) => {
  return (
    <>
      <Metadata title="Dashboard" description="Dashboard page" />
      <h1>DashboardPage</h1>
      <AnnouncementBoardCell tenantSlug={tenantSlug} />
    </>
  )
}

export default DashboardPage
