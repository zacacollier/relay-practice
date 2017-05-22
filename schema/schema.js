const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
} = graphql;

const users = [
  {
    id: 23,
    firstName: 'Jerry',
    age: 32,
  },
  {
    id: 69,
    firstName: 'George',
    age: 33,
  },
];

const UserType = new GraphQLObjectType(
  {
    name: 'User',
    fields: {
      id: { type: GraphQLString },
      firstName: { type: GraphQLString },
      age: { type: GraphQLInt },
    },
  }
);

const RootQuery = new GraphQLObjectType(
  {
    name: 'RootQueryType',
    fields: {
      user: {
        type: UserType,
        args: { id: { type: GraphQLString } },
        resolve(parentValue, args) {
          return _.find(users, { id: args.id });
        },
      },
    },
  }
);

module.exports = new GraphQLSchema({
  query: RootQuery,
});
