import react, { FC, useEffect } from "react";
import Task from "../Task/Task";
import TaskColumn from "../TaskColunm/TaskColumn";
import "./taskBoard.scss";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useTaskAction } from "../../hooks/useTaskAction";
import { useTypedSelector } from "../../hooks/useTypedSelector";
const TaskBoard: FC = () => {
  const isFetching = useTypedSelector((state) => state.taskList.isFetching);
  const { fetchTasks } = useTaskAction();
  useEffect(() => {
    fetchTasks();
  }, []);
  if (isFetching) {
    return <p>Loading...</p>;
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="columns is-justify-content-space-around">
        <TaskColumn status="TODO" statusName="Todo" />
        <TaskColumn status="IN_PROGRESS" statusName="In Progress" />
        <TaskColumn status="IN_TEST" statusName="In Test" />
      </div>
    </DndProvider>
  );
};

export default TaskBoard;
