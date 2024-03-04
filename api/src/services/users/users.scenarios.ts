import type { Prisma, User } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        id: '1',
        email: 'email1@server.com',
        username: 'username1',
        name: 'User Name',
        inviteCodes: {
          create: {
            id: 'invitecode_id_1',
            tenant: {
              create: {
                id: 'tenant_id_1',
                slug: 't1',
                name: 'Tenant 1',
              },
            },
          },
        },

        tenants: {
          connectOrCreate: {
            where: { id: 'asdasd' },
            create: {
              tenant: {
                connectOrCreate: {
                  where: { id: 'tenant_id_1' },
                  create: {
                    id: 'tenant_id_1',
                    slug: 't1',
                    name: 'Tenant 1',
                  },
                },
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        email: 'email2@server.com',
        username: 'username2',
        name: 'User Name2',
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
