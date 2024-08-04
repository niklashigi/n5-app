import { z } from "zod";

import { db } from "../lib/db";
import { trpc } from "../lib/trpc";

export const todosRouter = trpc.router({
  list: trpc.procedure.query(async ({}) => {
    const todos = await db.todo.findMany();

    return todos;
  }),
  create: trpc.procedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ input }) => {
      const createdTodo = await db.todo.create({
        data: {
          title: input.title,
          isCompleted: false,
        },
      });

      return createdTodo;
    }),
  delete: trpc.procedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await db.todo.delete({
        where: { id: input.id },
      });
    }),
  update: trpc.procedure
    .input(z.object({ id: z.string(), isCompleted: z.boolean() }))
    .mutation(async ({ input }) => {
      await db.todo.update({
        where: { id: input.id },
        data: {
          isCompleted: input.isCompleted,
        },
      });
    }),
});
