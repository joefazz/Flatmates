const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

const resolvers = {
  Query: {
    user(parent, args, ctx, info) {
      return ctx.db.query.user({ where: { facebookUserId: args.facebookUserId } }, info)
    },
    allUsers(parent, args, ctx, info) {
      return ctx.db.query.users({}, info);
    }
  },
  Mutation: {
    createUser(parent, { facebookUserId, name, email, firstName, lastName, birthday, gender, permissions, imageUrl }, ctx, info) {
      return ctx.db.mutation.createUser(
        {
          data: {
            facebookUserId,
            name,
            email,
            firstName,
            lastName,
            birthday,
            gender,
            permissions,
            imageUrl
          },
        },
        info,
      )
    },
  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'http://localhost:4466/flatmates-prisma/dev', // the endpoint of the Prisma DB service
      secret: 'mysecret123', // specified in database/prisma.yml
      debug: true, // log all GraphQL queryies & mutations
    }),
  }),
})

server.start(() => console.log('Server is running on http://localhost:4000'))
