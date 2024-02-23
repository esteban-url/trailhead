import EditAnnouncementCell from 'src/components/app/Announcement/EditAnnouncementCell/EditAnnouncementCell'

type AnnouncementPageProps = {
  id: string
}

const EditAnnouncementPage = ({ id }: AnnouncementPageProps) => {
  return <EditAnnouncementCell id={id} />
}

export default EditAnnouncementPage
