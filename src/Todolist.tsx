import { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValuesType } from "./App"

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (id: string) => void
  changeFilter: (value: FilterValuesType) => void
  addTask: (title: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean) => void
  filter: FilterValuesType
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export function Todolist(props: PropsType) {

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onNewTitleChangeHandle = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value);
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.key === "Enter") {
      props.addTask(newTaskTitle);
      setNewTaskTitle("");
    }
  };
  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addTask(newTaskTitle.trim());
      setNewTaskTitle("");
    } else {
      setError("Title is required")
      setNewTaskTitle("");
    }
  };
  const onAllClickHandler = () => props.changeFilter("all");
  const onActiveClickHandler = () => props.changeFilter("active");
  const onCompletedClickHandler = () => props.changeFilter("completed");

  return (
    <div>
      <h3>{props.title}</h3>
      <h3>What to learn</h3>
      <div>
        <input value={newTaskTitle}
          onChange={onNewTitleChangeHandle}
          onKeyPress={onKeyPressHandler}
          className={error ? "error" : ""} />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {
          props.tasks.map(task => {
            const onRemoveHandler = () => props.removeTask(task.id);
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked);

            return <li className={task.isDone ? "is-done" : ""}
              key={task.id}>
              <input type="checkbox"
                onChange={onChangeHandler}
                checked={task.isDone} />
              <span>{task.title}</span>
              <button onClick={onRemoveHandler}>X</button>
            </li>
          })
        }
      </ul>
      <div>
        <button className={props.filter === "all" ? "active-filter" : ""}
          onClick={onAllClickHandler}>All</button>
        <button className={props.filter === "active" ? "active-filter" : ""}
          onClick={onActiveClickHandler}>Active</button>
        <button className={props.filter === "completed" ? "active-filter" : ""}
          onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  )
}