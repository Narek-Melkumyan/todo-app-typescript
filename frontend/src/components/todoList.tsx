import type { TodoStatus, TodoType } from "../types/todoTypes.ts";

type Props = {
    data: TodoType[];
    openModal: (id: number) => void;
    getTodos: () => void;
};

function TodoList({ data, openModal, getTodos }: Props) {
    async function handleChange(id: number, status: TodoStatus) {
        try {
            const res = await fetch(`http://localhost:3002/api/todos/${id}/status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status }),
            });

            if (!res.ok) {
                throw new Error("Status update error");
            }

            getTodos();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="todo-list" id="todoList">
            {data.map((item: TodoType) => (
                <div className="todo-card" key={item.id}>
                    <div>
                        <span className={`badge ${item.status}`}>{item.status}</span>

                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </div>

                    <div className="actions">
                        <select
                            value={item.status}
                            onChange={(e) =>
                                handleChange(item.id, e.target.value as TodoStatus)
                            }
                        >
                            <option value="pending">Pending</option>
                            <option value="inprogress">In Progress</option>
                            <option value="done">Done</option>
                        </select>

                        <button
                            className="delete-btn"
                            onClick={() => openModal(item.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TodoList;