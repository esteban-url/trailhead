import AnnouncementCell from 'src/components/app/Announcement/AnnouncementCell/AnnouncementCell'

type AnnouncementPageProps = {
  id: string
}

const AnnouncementPage = ({ id }: AnnouncementPageProps) => {
  return <AnnouncementCell id={id} />
}

export default AnnouncementPage
