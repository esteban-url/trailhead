import AnnouncementCell from 'src/components/Announcement/AnnouncementCell'

type AnnouncementPageProps = {
  id: string
}

const AnnouncementPage = ({ id }: AnnouncementPageProps) => {
  return <AnnouncementCell id={id} />
}

export default AnnouncementPage
