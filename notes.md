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
      /* 1. parentValueObj - the previous object state of the data instance
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
