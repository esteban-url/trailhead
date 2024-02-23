import type { FindAnnouncementsByTenant } from 'types/graphql'

const AnnouncementBoard = ({ announcements }: FindAnnouncementsByTenant) => {
  return (
    <div>
      <h2 className="text-xl font-bold">Announcements:</h2>
      {announcements.map((announcement) => (
        <div key={announcement.id}>
          <h3>{announcement.message}</h3>
          <p>{announcement.createdAt}</p>
        </div>
      ))}
    </div>
  )
}
export default AnnouncementBoard
