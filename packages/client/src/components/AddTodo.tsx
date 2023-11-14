import { useState } from "react";
import { trpc } from "../lib/trpc";

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const addTodoMutation = trpc.todo.create.useMutation();
  const trpcContext = trpc.useContext();

  return (
    <form
      className="flex justify-between space-x-4"
      onSubmit={(event) => {
        event.preventDefault();
        addTodoMutation.mutate(
          { title: title },
          {
            onSuccess: () => {
              console.log("created a todo");
              void trpcContext.todo.list.invalidate();
              setTitle("");
            },
          },
        );
      }}
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
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
