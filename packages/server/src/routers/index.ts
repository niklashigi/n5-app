import { trpc } from "../lib/trpc";
import { todosRouter } from "./todos-router";

export const appRouter = trpc.router({
  todos: todosRouter,
});

export type AppRouter = typeof appRouter;
