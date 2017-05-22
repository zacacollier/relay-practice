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
