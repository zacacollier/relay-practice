const express = require('express');
const expressGraphQL = require('express-graphql');
const app = express();

const PORT = 1337;

app.use('/graphql', expressGraphQL(
  {
    graphiql: true,
  }
));
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
