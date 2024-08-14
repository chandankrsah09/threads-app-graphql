import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  app.use(express.json());

  // create Graphql server
  const server = new ApolloServer({
    typeDefs: `
        type Query {
            hello: String!
            say(name: String): String
        }
    `,
    resolvers: {
      Query: {
        hello: () => `Hey there, I am a graphql server`,
        say: (_, { name }: { name: String }) => `Hey ${name}, How are you`
      },
    },
  });

  // Start the gql server
  await server.start();

  app.get("/", (req, res) => {
    res.json({ message: "Server is up and running" });
  });

  //   Middleware
  app.use("/graphql", expressMiddleware(server));

  app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
}

init();
