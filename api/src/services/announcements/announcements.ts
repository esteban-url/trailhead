import type {
  QueryResolvers,
  MutationResolvers,
  AnnouncementRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import uID from 'src/lib/nanoId'

export const announcements: QueryResolvers['announcements'] = () => {
  return db.announcement.findMany()
}
export const announcementsByTenantSlug: QueryResolvers['announcementsByTenantSlug'] =
  ({ tenantSlug }) => {
    return db.announcement.findMany({
      where: {
        tenant: {
          is: {
            slug: tenantSlug,
          },
        },
      },
    })
  }

export const announcement: QueryResolvers['announcement'] = ({ id }) => {
  return db.announcement.findUnique({
    where: { id },
  })
}

export const createAnnouncement: MutationResolvers['createAnnouncement'] = ({
  input,
}) => {
  if (!input.id) {
    input.id = uID()
  }
  return db.announcement.create({
    data: input,
  })
}

export const updateAnnouncement: MutationResolvers['updateAnnouncement'] = ({
  id,
  input,
}) => {
  return db.announcement.update({
    data: input,
    where: { id },
  })
}

export const deleteAnnouncement: MutationResolvers['deleteAnnouncement'] = ({
  id,
}) => {
  return db.announcement.delete({
    where: { id },
  })
}

export const Announcement: AnnouncementRelationResolvers = {
  user: (_obj, { root }) => {
    return db.announcement.findUnique({ where: { id: root?.id } }).user()
  },
  tenant: (_obj, { root }) => {
    return db.announcement.findUnique({ where: { id: root?.id } }).tenant()
  },
}
