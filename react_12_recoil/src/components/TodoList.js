import { useRecoilValue } from "recoil";
import TodoItem from "./TodoItem";
import { filteredTodoListState, todoListState } from "../Atoms";
import TodoItemCreator from "./TodoItemCreator";
import TodoListStats from "./TodoListStats";
import TodoListFilters from "./TodoListFilters";

export default function TodoList() {
  // const todoList = useRecoilValue(todoListState);
  const todoList = useRecoilValue(filteredTodoListState);

  return (
    <>
      <TodoListStats />
      <TodoListFilters />
      <TodoItemCreator />

      {todoList.map((todoItem) => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </>
  );
}
