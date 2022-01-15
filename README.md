# Trailhead

## Migrations
When you want to add a table:

add the model to the `schema.prisma` file, for example:

```
model Announcement {
  id          Int      @id @default(autoincrement())
  createdAt   DateTime @default(now())
  updatedAt   DateTime @default(now())
  title       String
  body        String
  active      Boolean @default(true)
  expiration  DateTime
}
```
Now run the `yarn rw prisma migrate dev` command to generate a migration.

This will modify your database as specified in the `schema.prisma` file.

If you get an error like this, you will probably need to create a shadow database, read the next section (running supabase locally) for more info

```
Error: db error: FATAL: unexpected response from login query
   0: sql_migration_connector::flavour::postgres::sql_schema_from_migration_history
             at migration-engine/connectors/sql-migration-connector/src/flavour/postgres.rs:367
   1: migration_core::api::DevDiagnostic
             at migration-engine/core/src/api.rs:108
```

### running supabase locally
You can run a supabase instance locally for development, "this greatly simplifies your life", allowing you to work unplugged.

The reason why I did it though, is to create data migrations, you will need a shadow database, since you cant run migration directly on the cloud
more info:
https://github.com/prisma/prisma/issues/10575

To be able to run supabase locally, follow this steps:

1- install the supabase cli
```sh
npm install -g supabase
```

2- initiallice it in your project
```sh
supabase init
```

3- install docker if you don't already have it
```sh
brew install --cask docker
```

4- run the instance
```sh
docker-compose up
```

5- you can now create and run migrations
```sh
yarn rw prisma migrate dev
```

Another alternative is to create a dedicated shadow-databse elsewhere, it might evev be you locally run pstgres server
more info:
https://www.prisma.io/docs/concepts/components/prisma-migrate/shadow-database#cloud-hosted-shadow-databases-must-be-created-manually

# Redwood

> **NOTICE:** RedwoodJS is very close to a stable version 1.0. In the last two years,
> the project has matured significantly and is already used in production by a number
> of startups. We intend to have a 1.0 release candidate before the end of 2021 and
> to release a truly production-ready 1.0 in early 2022.

## Getting Started
- [Tutorial](https://redwoodjs.com/tutorial/welcome-to-redwood): getting started and complete overview guide.
- [Docs](https://redwoodjs.com/docs/introduction): using the Redwood Router, handling assets and files, list of command-line tools, and more.
- [Redwood Community](https://community.redwoodjs.com): get help, share tips and tricks, and collaborate on everything about RedwoodJS.

### Setup

We use Yarn as our package manager. To get the dependencies installed, just do this in the root directory:

```terminal
yarn install
```

### Fire it up

```terminal
yarn redwood dev
```

Your browser should open automatically to `http://localhost:8910` to see the web app. Lambda functions run on `http://localhost:8911` and are also proxied to `http://localhost:8910/.redwood/functions/*`.
