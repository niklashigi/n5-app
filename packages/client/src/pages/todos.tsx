import AddTodoForm from "../components/add-todo-form";
import TodosList from "../components/todos-list";

export function TodosPage() {
  return (
    <div className="flex flex-col gap-3">
      <TodosList />
      <AddTodoForm />
    </div>
  );
}
