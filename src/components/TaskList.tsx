import Task from "../types/Task";
import formatDate from "../shared/dataFormt";
interface ITask {
  tasks: Task[];
}

function TaskList({ tasks }: ITask) {
  function removeTask(id: string) {
    const loadTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const removedTask = loadTasks.filter(
      (task: { id: string }) => task.id !== id
    );
    localStorage.setItem("tasks", JSON.stringify(removedTask));
  }

  return (
    <div className="mt-8">
      {tasks && (
        <table className="w-full border-2 table-fixed">
          <thead>
            <tr className="border-2">
              <th className="border-2">Title</th>
              <th className="border-2">Due Date</th>
              <th className="border-2">Category</th>
              <th className="border-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks &&
              tasks.map((task) => {
                return (
                  <tr className="border-2" key={task.id}>
                    <td className="text-center border-2">{task.title}</td>
                    <td className="text-center border-2">
                      {formatDate(task.dueDate)}
                    </td>
                    <td className="text-center border-2">{task.category}</td>
                    <td className="text-center border-2">
                      <button
                        onClick={() => removeTask(task.id)}
                        className="p-2 text-red-500 border-2 border-red-500 rounded hover:bg-red-500 hover:text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TaskList;
