import AddTodo from "../components/AddTodo";
import ListTodos from "../components/ListTodos";

export function TodosPage() {
  return (
    <div className="flex flex-col gap-3">
      <ListTodos />
      <AddTodo />
    </div>
  );
}
