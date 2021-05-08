import React, { FC, useState, useRef } from "react";
import ReactModal from "react-modal";
import { useFormInput } from "../../hooks/useFormInput";
import { useTaskAction } from "../../hooks/useTaskAction";
import { StatusType } from "../../redux/types/statusType";
import MDEditor from "@uiw/react-md-editor";
import { useTypedSelector } from "../../hooks/useTypedSelector";

interface NewTaskModalProps {
  closeModal: () => void;
  openModal: () => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  status: StatusType;
}

const customModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "75%",
    height: "75%",
  },
};

ReactModal.setAppElement("#root");
const NewTaskModal: FC<NewTaskModalProps> = ({
  isOpen,
  setIsOpen,
  openModal,
  closeModal,
  status,
}) => {
  const title = useFormInput("");
  const [content, setContent] = useState("");
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  const { changeTaskStatus, createNewTask } = useTaskAction();
  const [selectedStatus, setSelectedStatus] = useState(status);

  const isLoadingNew = useTypedSelector(
    (state) => state.taskList.loadingNewTask
  );

  const handleCreateNewTask = async () => {
    console.log(status);
    console.log(content);
    console.log(title.value);
    await createNewTask({
      title: title.value,
      body: content,
      status: selectedStatus,
      isLoading: false,
      id: "",
    });

    setIsOpen(false);
  };
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={false}
      style={customModalStyles}
    >
      <form>
        <h2 className="title">Create new Task</h2>
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              {...title}
              className="input"
              type="text"
              placeholder="Title..."
            />
          </div>
        </div>
        <label className="label">Status</label>
        <div className="field">
          <div className="select">
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value as StatusType);
              }}
            >
              <option>TODO</option>
              <option>IN_TEST</option>
              <option>IN_PROGRESS</option>
            </select>
          </div>
        </div>

        <div className="field">
          <label className="label">Description</label>
          <div className="control"></div>
        </div>

        {editing ? (
          <div ref={ref}>
            <MDEditor
              value={content}
              onChange={(value) => {
                setContent(value || "");
              }}
            />
            <button onClick={() => setEditing(false)}>close</button>
          </div>
        ) : (
          <div className="card text-editor" onClick={() => setEditing(true)}>
            <div className="card-content">
              <MDEditor.Markdown source={content || "Click to edit..."} />
            </div>
          </div>
        )}

        <input type="hidden" value={content} />
      </form>
      <div className="form-footer">
        <button className="button is-danger" onClick={closeModal}>
          Close
        </button>

        <button
          className={`button is-primary ${isLoadingNew ? "is-loading" : ""}`}
          onClick={handleCreateNewTask}
        >
          Create
        </button>
      </div>
    </ReactModal>
  );
};

export default NewTaskModal;
