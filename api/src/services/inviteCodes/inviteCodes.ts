import type {
  QueryResolvers,
  MutationResolvers,
  InviteCodeRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import uID from 'src/lib/nanoId'

export const inviteCodes: QueryResolvers['inviteCodes'] = () => {
  return db.inviteCode.findMany()
}

export const inviteCode: QueryResolvers['inviteCode'] = ({ id }) => {
  return db.inviteCode.findUnique({
    where: { id: id.trim().toLowerCase() },
  })
}

export const isValidInviteCode: QueryResolvers['isValidInviteCode'] = async ({
  id,
}) => {
  const invite = await inviteCode({ id })
  return invite ? true : false
}

export const createInviteCode: MutationResolvers['createInviteCode'] = async ({
  input,
}) => {
  return db.inviteCode.create({
    data: {
      id: uID(),
      tenant: { connect: { slug: input.tenantSlug } },
      user: {
        connect: { id: context.currentUser.id || context.currentUser.sub },
      },
    },
  })
}

export const updateInviteCode: MutationResolvers['updateInviteCode'] = ({
  id,
  input,
}) => {
  return db.inviteCode.update({
    data: input,
    where: { id },
  })
}

export const deleteInviteCode: MutationResolvers['deleteInviteCode'] = ({
  id,
}) => {
  return db.inviteCode.delete({
    where: { id },
  })
}

export const InviteCode: InviteCodeRelationResolvers = {
  tenant: (_obj, { root }) => {
    return db.inviteCode.findUnique({ where: { id: root?.id } }).tenant()
  },
  user: (_obj, { root }) => {
    return db.inviteCode.findUnique({ where: { id: root?.id } }).user()
  },
}
