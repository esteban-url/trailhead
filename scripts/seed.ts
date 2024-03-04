import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'

export default async () => {
  try {
    //
    // Manually seed via `yarn rw prisma db seed`
    // Seeds automatically with `yarn rw prisma migrate dev` and `yarn rw prisma migrate reset`
    //
    // Update "const data = []" to match your data model and seeding needs
    //
    const tenants: Prisma.TenantCreateArgs['data'][] = [
      { id: '1', slug: 'tenant1', name: 'Tenant 1' },
      { id: '2', slug: 'tenant2', name: 'Tenant 2' },
      { id: '3', slug: 'tenant3', name: 'Tenant 3' },
    ]
    const users: Prisma.UserCreateArgs['data'][] = [
      { id: '1', email: 'admin@ex.com', name: 'Admin', username: 'admin' },
    ]
    const invites: Prisma.InviteCodeCreateArgs['data'][] = [
      {
        id: '1',
        tenantId: '1',
        userId: '1',
      },
    ]
    console.log(
      "\nUsing the default './scripts/seed.ts' template\nEdit the file to add seed data\n"
    )

    if ((await db.tenant.count()) === 0) {
      // Note: if using PostgreSQL, using `createMany` to insert multiple records is much faster
      // @see: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany
      await Promise.all(
        tenants.map(async (data: Prisma.TenantCreateArgs['data']) => {
          const record = await db.tenant.create({ data })
          console.log(record)
        })
      )
    } else {
      console.log('tenants already seeded')
    }
    if ((await db.user.count()) === 0) {
      // Note: if using PostgreSQL, using `createMany` to insert multiple records is much faster
      // @see: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany
      await Promise.all(
        users.map(async (data: Prisma.UserCreateArgs['data']) => {
          const record = await db.user.create({ data })
          console.log(record)
        })
      )
    } else {
      console.log('Users already seeded')
    }
    if ((await db.inviteCode.count()) === 0) {
      // Note: if using PostgreSQL, using `createMany` to insert multiple records is much faster
      // @see: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany
      await Promise.all(
        invites.map(async (data: Prisma.InviteCodeCreateArgs['data']) => {
          const record = await db.inviteCode.create({ data })
          console.log(record)
        })
      )
    } else {
      console.log('invites already seeded')
    }
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
