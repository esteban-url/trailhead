import EditAnnouncementCell from 'src/components/Announcement/EditAnnouncementCell'

type AnnouncementPageProps = {
  id: string
}

const EditAnnouncementPage = ({ id }: AnnouncementPageProps) => {
  return <EditAnnouncementCell id={id} />
}

export default EditAnnouncementPage
