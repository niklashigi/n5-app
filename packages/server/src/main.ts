import express, { type Application } from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";

import { appRouter } from "./routers";
import { createContext } from "./lib/trpc";

const app: Application = express();
app.use(cors());

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
    onError: ({ error }) => {
      console.error(error);
    },
  }),
);

const PORT: number = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
