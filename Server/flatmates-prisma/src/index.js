const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

const resolvers = {
  Query: {
    user(parent, { facebookUserId }, ctx, info) {
      return ctx.db.query.user({ where: { facebookUserId } }, info)
    },
    house(parent, { shortID }, ctx, info) {
      return ctx.db.query.house({ where: { shortID } }, info)
    },
    post(parent, { ID }, ctx, info) {
      return ctx.db.query.post({ where: { ID } }, info)
    },
    allPosts(parent, { take, skip }, ctx, info) {
      return ctx.db.query.posts({ take: { take }, skip: { skip } }, info)
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
    updateUserCreateHouse(parent, { facebookUserId, bio, course, studyYear, isSmoker, socialScore, shortID, road, billsPrice, rentPrice, spaces, houseImages }, ctx, info) {
      return ctx.db.mutation.updateUser(
        {
          where: { facebookUserId },
          data: {
            bio,
            course,
            studyYear,
            isSmoker,
            socialScore,
            house: {
              create: {
                shortID,
                road,
                billsPrice,
                rentPrice,
                spaces,
                houseImages: { set: houseImages }
              },
            }
          }
        }
      )
    },
    updateUserUpdateHouse(parent, { facebookUserId, bio, course, studyYear, isSmoker, socialScore, houseId }, ctx, info) {
      return ctx.db.mutation.updateUser(
        {
          where: { facebookUserId },
          data: {
            bio,
            course,
            studyYear,
            isSmoker,
            socialScore,
            house: {
              connect: { shortID: houseId }
            }
          }
        }
      )
    },
    createPost(parent, { title, description, createdBy }, ctx, info) {
      return ctx.db.mutation.createPost(
        {
          data: {
            title,
            description,
            connect: { facebookUserId: createdBy }
          }
        }
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
