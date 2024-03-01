import type {
  QueryResolvers,
  MutationResolvers,
  TenantUserRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import uID from 'src/lib/nanoId'

export const tenantUsers: QueryResolvers['tenantUsers'] = () => {
  return db.tenantUser.findMany()
}

export const tenantUser: QueryResolvers['tenantUser'] = ({ id }) => {
  return db.tenantUser.findUnique({
    where: { id },
  })
}

export const createTenantUser: MutationResolvers['createTenantUser'] = ({
  input,
}) => {
  if (!input.id) {
    input.id = uID()
  }
  return db.tenantUser.create({
    data: input,
  })
}

export const updateTenantUser: MutationResolvers['updateTenantUser'] = ({
  id,
  input,
}) => {
  return db.tenantUser.update({
    data: input,
    where: { id },
  })
}

export const deleteTenantUser: MutationResolvers['deleteTenantUser'] = ({
  id,
}) => {
  return db.tenantUser.delete({
    where: { id },
  })
}

export const TenantUser: TenantUserRelationResolvers = {
  user: (_obj, { root }) => {
    return db.tenantUser.findUnique({ where: { id: root?.id } }).user()
  },
  tenant: (_obj, { root }) => {
    return db.tenantUser.findUnique({ where: { id: root?.id } }).tenant()
  },
}
