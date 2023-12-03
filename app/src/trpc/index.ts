// import { nodeHandler } from "trpc-playground/handlers/node";
import * as trpcExpress from "@trpc/server/adapters/express";
import { initTRPC } from "@trpc/server";
import express from "express";
import { z } from "zod";
const t = initTRPC.create();
const p = t.procedure;

const router = t.router({
  greet: p
    .input(
      z.object({
        numero: z.number(),
        nome: z.string(),
      })
    )
    .query(({ input }) => {
      return { numero: input.numero };
    }),
});
export type Router = typeof router;
const app = express();
app.use(express.json());
const apiEndPoint = "/trpc";

app.use(
  apiEndPoint,
  trpcExpress.createExpressMiddleware({
    router,
  })
);

const port = 8080;
app.get("/", (req, res) => res.send("Hello Express 🦊"));
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
