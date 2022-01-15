import type { Prisma } from '@prisma/client'
import type { ResolverArgs } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const userRoles = () => {
  return db.userRole.findMany()
}

export const userRole = ({ id }: Prisma.UserRoleWhereUniqueInput) => {
  return db.userRole.findUnique({
    where: { id },
  })
}

interface CreateUserRoleArgs {
  input: Prisma.UserRoleCreateInput
}

export const createUserRole = ({ input }: CreateUserRoleArgs) => {
  return db.userRole.create({
    data: input,
  })
}

interface UpdateUserRoleArgs extends Prisma.UserRoleWhereUniqueInput {
  input: Prisma.UserRoleUpdateInput
}

export const updateUserRole = ({ id, input }: UpdateUserRoleArgs) => {
  return db.userRole.update({
    data: input,
    where: { id },
  })
}

export const deleteUserRole = ({ id }: Prisma.UserRoleWhereUniqueInput) => {
  return db.userRole.delete({
    where: { id },
  })
}

export const UserRole = {
  user: (_obj, { root }: ResolverArgs<ReturnType<typeof userRole>>) =>
    db.userRole.findUnique({ where: { id: root.id } }).user(),
}
