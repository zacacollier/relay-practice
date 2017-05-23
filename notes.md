### Schema
Need at minimum:
- `name`
- `fields`
  - `(entries)`

Queries should match the signature of their respective data:
```js
  ...
  {
    name: 'User',
    fields: {
      id: { type: GraphQLString },
      firstName: { type: GraphQLString },
      age: { type: GraphQLInt },
    },
  }
  ...
```

```js
  ...
  {
    name: 'RootQueryType',
    fields: {
      user: {
        type: UserType,
        args: { id: { type: GraphQLString } }
      },
    },
  }
  ...
```

Lodash be yr frend:
```js
  ...
        resolve(parentValue, args) {
          return _.find(users, { id: args.id })
  ...
```

### Resolver functions

- Require 2 arguments at minimum:
```js
    resolver(parentValueObj, args[, context]) {
      /* 1. parentValueObj - the current state of the data instance
       * 2. args           - the arguments supplied to the Resolver
       * 3. context        - important contextual information,
       *                     such as currently logged-in user credentials
       *                     or database access methods:
       *                     return context.db.loadHumanByID(args.id)
       *                       .then(userData => new Human(userData))
      */
    }
```

- ***Always remember to `return`!***

```js
    resolve(parentValue, args) {
      console.log(parentValue, args);
        return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
        .then(res => res.data);
    }
```

Resolve circular Type definition errors with an Arrow function:

```js
  ...
  {
    name: 'User',
    fields: () => ({
      id: { type: GraphQLString },
      firstName: { type: GraphQLString },
      age: { type: GraphQLInt },
    }),
  }
  ...
```

### Query Fragments

- 'alias' queries like so:
```
{
  walmart: company(id: "1") {
    ...CompanyDetails
  }
  amazon: company(id: "2") {
    ...CompanyDetails
  }
}

fragment CompanyDetails on Company {
  id
  name
  description
  users {
    age
    firstName
    id
  }
}
```

### Mutations

- a mutation `field`'s type should match that of the value returned by the Resolver:
```
name: 'Mutation',
fields: {
  addUser: {
    type: UserType,
```

- use GraphQLNonNull to mark fields as 'required':
```
args: {
  firstName: { type: new GraphQLNonNull(GraphQLString) },
  age: { type: new GraphQLNonNull(GraphQLInt) },
  companyId: { type: GraphQLString },
},
```

- destructure args on the fly like so:
```
resolve(parentValue, { firstName, age }) {
  return axios.post(`${HOST}/users`, { firstName, age })
    .then(res => res.data);
},
```
