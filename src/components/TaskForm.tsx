import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import categories from "../types/categories";
import { v4 as uuidv4 } from "uuid";
const createTaskFormSchema = z.object({
  title: z
    .string()
    .nonempty("Title is required")
    .min(3, "Title needs to have minimum 3 caracters")
    .max(50, "Title needs to have maximo 50 caracters"),
  dueDate: z.coerce.date(),
  category: z.string().nonempty('Category is required'),
});
type CreateTaskFormData = z.infer<typeof createTaskFormSchema>;

function TaskForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTaskFormData>({
    resolver: zodResolver(createTaskFormSchema),
  });

  function createTask(data: CreateTaskFormData) {
    let element = {
      id: uuidv4(),
      title: data.title,
      dueDate: data.dueDate,
      category: data.category,
    };

    const loadTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    let taskArr = Array.from(loadTasks);
    const myTask = element;
    taskArr.push(myTask);
    localStorage.setItem("tasks", JSON.stringify(taskArr));
  }

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit(createTask)}>
        <div className="flex flex-col gap-2">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="h-10 px-2 border-2 rounded border-zinc-100 focus:border-solid focus:border-4 focus:outline-none focus:border-input-border"
            {...register("title")}
          />
          {errors.title && (
            <span className="text-red-400">{errors.title.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2 my-4">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            className="h-10 px-2 border-2 rounded border-zinc-100 focus:border-solid focus:border-4 focus:outline-none focus:border-input-border"
            {...register("dueDate")}
          />
          {errors.dueDate && (
            <span className="text-red-400">{errors.dueDate.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2 my-4">
          <label htmlFor="categories">Category</label>
          <select
            {...register("category")}
            className="h-10 px-2 border-2 rounded border-zinc-100 focus:border-solid focus:border-4 focus:outline-none focus:border-input-border"
          >
            <option value=""></option>
            {categories &&
              categories.map((category, index) => {
                return (
                  <option value={category} key={index}>
                    {category}
                  </option>
                );
              })}
          </select>
          {errors.category && (
            <span className="text-red-400">{errors.category.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="p-2 text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
