import { type inferAsyncReturnType, initTRPC } from "@trpc/server";
import type * as trpcExpress from "@trpc/server/adapters/express";

export const createContext = ({
  req: _req,
  res: _res,
}: trpcExpress.CreateExpressContextOptions) => {
  // TODO: Add authentication logic here (if needed)

  return {};
};

type Context = inferAsyncReturnType<typeof createContext>;

export const trpc = initTRPC.context<Context>().create();
