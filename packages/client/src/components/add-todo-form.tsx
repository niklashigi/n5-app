import { useState } from "react";
import { trpc } from "../lib/trpc";

export default function AddTodoForm() {
  const addTodoMutation = trpc.todos.create.useMutation();
  const trpcUtils = trpc.useUtils();

  const [title, setTitle] = useState("");

  return (
    <form
      className="flex justify-between space-x-4"
      onSubmit={(event) => {
        event.preventDefault();
        addTodoMutation.mutate(
          { title: title },
          {
            onSuccess: () => {
              void trpcUtils.todos.list.invalidate();
              setTitle("");
            },
          },
        );
      }}
    >
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        type="text"
        placeholder="Get milk..."
        className="flex-grow rounded-md"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 active:bg-blue-500 text-white py-1 px-3 rounded-md"
      >
        Add todo
      </button>
    </form>
  );
}
