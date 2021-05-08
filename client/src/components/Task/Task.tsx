import react, { FC, Fragment, useState } from "react";
import { TaskTypes } from "../../dragTypes/TaskTypes";
import { useTaskAction } from "../../hooks/useTaskAction";
import { useDrag } from "react-dnd";
import MDEditor from "@uiw/react-md-editor";
import "./task.scss";
import { StatusType } from "../../redux/types/statusType";
import UpdateTaskModal from "../updateTaskModal/UpdateTaskModal";

interface TaskProps {
  id: string;
  title: string;
  body: string;
  status: "TODO" | "IN_TEST" | "IN_PROGRESS";
  isLoading: boolean;
}

const Task: FC<TaskProps> = ({ id, title, body, status, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { deleteTask, changeTaskStatus, updateTaskStart } = useTaskAction();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: TaskTypes.TASK,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        const res = monitor.getDropResult<{ status: StatusType }>();
        if (res?.status) {
          updateTaskStart(id, { status: res.status });
        }
      }
    },
  }));
  return (
    <Fragment>
      <UpdateTaskModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        status={status}
        name={title}
        body={body}
        id={id}
      />
      <div
        ref={drag}
        style={{ opacity: isDragging ? 0.5 : 1 }}
        className="card mt-2 task mb-5"
      >
        <p className="card-header-title">{title}</p>
        <div className="card-content">
          <div className="content">
            <MDEditor.Markdown source={body || "Click to edit..."} />
          </div>
        </div>
        <footer className="card-footer">
          <button
            onClick={() => setIsOpen(true)}
            className="card-footer-item btn-edit"
          >
            EDIT
          </button>
          <button
            onClick={() => deleteTask(id)}
            className={`card-footer-item is-hoverable btn-delete ${
              isLoading ? "is-loading" : ""
            }`}
          >
            <span>DELETE</span>
          </button>
        </footer>
      </div>
    </Fragment>
  );
};

export default Task;
