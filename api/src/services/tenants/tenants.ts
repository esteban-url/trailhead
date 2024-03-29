import type {
  QueryResolvers,
  MutationResolvers,
  TenantRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import uID from 'src/lib/nanoId'

export const tenants: QueryResolvers['tenants'] = () => {
  return db.tenant.findMany()
}

export const tenant: QueryResolvers['tenant'] = ({ id }) => {
  return db.tenant.findUnique({
    where: { id },
  })
}

export const createTenant: MutationResolvers['createTenant'] = ({ input }) => {
  if (!input.id) {
    input.id = uID()
  }
  return db.tenant.create({
    data: input,
  })
}

export const updateTenant: MutationResolvers['updateTenant'] = ({
  id,
  input,
}) => {
  return db.tenant.update({
    data: input,
    where: { id },
  })
}

export const deleteTenant: MutationResolvers['deleteTenant'] = ({ id }) => {
  return db.tenant.delete({
    where: { id },
  })
}

export const Tenant: TenantRelationResolvers = {
  members: (_obj, { root }) => {
    return db.tenant.findUnique({ where: { id: root?.id } }).members()
  },
  announcements: (_obj, { root }) => {
    return db.tenant.findUnique({ where: { id: root?.id } }).announcements()
  },
}

// Custom resolvers

export const tenantBySlug: QueryResolvers['tenantBySlug'] = ({ slug }) => {
  return db.tenant.findUnique({
    where: { slug },
  })
}
