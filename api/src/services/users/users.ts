import type {
  QueryResolvers,
  MutationResolvers,
  UserRelationResolvers,
} from 'types/graphql'

import { validate, validateUniqueness, validateWithSync } from '@redwoodjs/api'

import { db } from 'src/lib/db'
import uID from 'src/lib/nanoId'
import { reservedUsernames } from 'src/lib/reserved-usernames'

import { inviteCode, inviteCodes } from '../inviteCodes/inviteCodes'

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany()
}

export const user: QueryResolvers['user'] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}
export const userToLink: QueryResolvers['userToLink'] = ({ id }) => {
  if (id.length > 13) return null
  return db.user.findUnique({
    where: { id },
  })
}
export const userWithTenants: QueryResolvers['userWithTenants'] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
    include: {
      tenants: true,
    },
  })
}
export const userByEmail: QueryResolvers['userByEmail'] = ({ email }) => {
  return db.user.findUnique({
    where: { email },
  })
}
export const userByPhone: QueryResolvers['userByPhone'] = ({ phone }) => {
  return db.user.findUnique({
    where: { phone },
  })
}
export const userByUsername: QueryResolvers['userByUsername'] = ({
  username,
}) => {
  return db.user.findUnique({
    where: { username },
  })
}

export const userByIdentity: QueryResolvers['userByIdentity'] = ({
  identity,
}) => {
  return db.user.findFirst({
    where: {
      OR: [{ email: identity }, { phone: identity }, { username: identity }],
    },
  })
}

export const isEmailUnique: QueryResolvers['isEmailUnique'] = async ({
  email,
}) => {
  if (!email) return true

  return (await userByEmail({ email })) ? false : true
}
export const isPhoneUnique: QueryResolvers['isPhoneUnique'] = ({ phone }) => {
  if (!phone) return true

  return userByPhone({ phone }) ? false : true
}
export const isUsernameUnique: QueryResolvers['isUsernameUnique'] = async ({
  username,
}) => {
  return (await userByUsername({ username })) ? false : true
}
export const isIdentityUnique: QueryResolvers['isIdentityUnique'] = ({
  identity,
}) => {
  return userByIdentity({ identity }) ? false : true
}

export const createUser: MutationResolvers['createUser'] = ({ input }) => {
  if (!input.id) {
    input.id = uID()
  }
  return db.user.create({
    data: input,
  })
}

export const signUpUser: MutationResolvers['signUpUser'] = async ({
  input,
}) => {
  validate(input.username, 'username', {
    presence: true,
    exclusion: {
      in: reservedUsernames,
      message: 'Sorry that username is taken',
    },
    length: {
      min: 2,
      max: 57,
      message: 'Please provide an username at least two characters long',
    },
    format: {
      // allow only letters, numbers, underscores and dashes
      pattern: /^[a-zA-Z0-9_-]*$/,
      message: 'Name can only contain letters, numbers, underscores and dashes',
    },
  })

  const invite = await inviteCode({ id: input.inviteCode })
  validateWithSync(() => (invite ? true : 'Invalid invite code'))
  // await validateWith(async () => {
  //   if ((await isValidInviteCode({ id: input.code })) === false) {
  //     throw 'Invalid invite code'
  //   }
  // })
  if (!input.id) {
    input.id = uID()
  }

  return validateUniqueness(
    'user',
    { username: input.username, email: input.email, phone: input.phone },
    (db) => {
      // create user and connect to tenant using invite code

      return db.user.create({
        data: {
          ...input,
          tenants: {
            connectOrCreate: {
              where: { id: invite?.tenantId },
              create: {
                tenantId: invite?.tenantId,
                // userId: input.id,
              },
            },
          },
        },
      })
    }
  )
}

export const linkUser: MutationResolvers['linkUser'] = async ({ input }) => {
  if (await db.user.findUnique({ where: { id: input.supaId } })) {
    throw new Error('User already linked')
  }

  const user = await db.user.findUnique({ where: { id: input.id } })
  if (!user) {
    throw new Error('User not found')
  }

  // compare if the user created dates are almost the same (within 10 seconds)
  if (
    Math.abs(
      new Date(user.createdAt).getTime() - new Date(input.createdAt).getTime()
    ) >
    10 * 1000
  ) {
    throw new Error('Users not created at the same time')
  }
  if (user.email !== input.email && user.phone !== input.phone) {
    throw new Error('User already linked')
  }
  await db.user.update({
    data: {
      id: input.supaId,
    },
    where: {
      id: input.id,
    },
  })
  await db.tenantUser.updateMany({
    data: {
      userId: input.supaId,
    },
    where: {
      userId: input.id,
    },
  })
  return db.user.findUnique({ where: { id: input.supaId } })
}

export const updateUser: MutationResolvers['updateUser'] = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser: MutationResolvers['deleteUser'] = async ({ id }) => {
  await db.tenantUser.deleteMany({
    where: { userId: id },
  })
  await db.inviteCode.deleteMany({
    where: { userId: id },
  })
  return db.user.delete({
    where: { id },
  })
}

export const User: UserRelationResolvers = {
  tenants: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).tenants()
  },
  Announcement: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).Announcement()
  },
}
