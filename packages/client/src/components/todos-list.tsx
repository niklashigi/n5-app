import clsx from "clsx";

import { trpc } from "../lib/trpc";

import IconX from "~icons/tabler/x";
import IconSquare from "~icons/tabler/square";
import IconSquareCheckFilled from "~icons/tabler/square-check-filled";

export default function TodosList() {
  const trpcUtils = trpc.useUtils();

  const response = trpc.todos.list.useQuery();
  const deleteMutation = trpc.todos.delete.useMutation({
    onSuccess: () => void trpcUtils.todos.list.invalidate(),
  });
  const updateMutation = trpc.todos.update.useMutation({
    onSuccess: () => void trpcUtils.todos.list.invalidate(),
  });

  if (response.isError) {
    return <h2>Error...</h2>;
  }

  if (response.isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {response.data.map((todo) => {
        return (
          <li
            className="flex justify-between items-center bg-gray-100 py-2 px-3 rounded-md space-x-2"
            key={todo.id}
          >
            <button
              className="rounded text-sm hover:line-through cursor-pointer hover:text-black"
              onClick={() =>
                updateMutation.mutate({
                  id: todo.id,
                  isCompleted: !todo.isCompleted,
                })
              }
            >
              {todo.isCompleted ? (
                <IconSquareCheckFilled className="w-6 h-6 text-gray-400" />
              ) : (
                <IconSquare className="w-6 h-6 text-gray-500" />
              )}
            </button>

            <p
              className={clsx(
                "flex-grow",
                todo.isCompleted
                  ? "line-through text-gray-500"
                  : "text-gray-900",
              )}
            >
              {todo.title}
            </p>

            <button
              onClick={() => deleteMutation.mutate({ id: todo.id })}
              className="text-gray-300 hover:text-white hover:bg-red-500 p-1 rounded"
            >
              <IconX />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
