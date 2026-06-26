import Form from "./components/form.tsx";
import Filters from "./components/filters.tsx";
import TodoStats from "./components/todo-stats.tsx";
import TodoList from "./components/todoList.tsx";
import Modal from "./components/modal.tsx";

import { useEffect, useMemo, useState } from "react";
import type { KpiType, TodoStatus, TodoType } from "./types/todoTypes.ts";

function App() {
    const [data, setData] = useState<TodoType[]>([]);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    useEffect(() => {
        getTodos();
    }, []);

    async function getTodos() {
        try {
            const res = await fetch("http://localhost:3002/api/todos");

            if (!res.ok) {
                throw new Error("Get todos error");
            }

            const list = await res.json();
            setData(list);
        } catch (err) {
            console.log(err);
        }
    }

    async function filterData(value: { q: string; status: TodoStatus | "all" }) {
        try {
            let url = `http://localhost:3002/api/todos/search?`;

            if (value.q) {
                url += `q=${value.q}`;
            }

            if (value.status !== "all") {
                url += value.q ? `&status=${value.status}` : `status=${value.status}`;
            }

            const res = await fetch(url);

            if (!res.ok) {
                throw new Error("Search todos error");
            }

            const list = await res.json();
            setData(list);
        } catch (err) {
            console.log(err);
        }
    }
    function openModal(id: number) {
        setDeleteId(id);
    }

    function closeModal() {
        setDeleteId(null);
    }

    async function deleteTodo() {
        if (!deleteId) return;

        try {
            const res = await fetch(`http://localhost:3002/api/todos/${deleteId}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Delete error");
            }

            closeModal();
            getTodos();
        } catch (err) {
            console.log(err);
        }
    }

    const kpiData: KpiType = useMemo(() => {
        return data.reduce(
            (prev: KpiType, current: TodoType) => {
                prev.all++;

                if (current.status === "done") {
                    prev.done++;
                } else if (current.status === "inprogress") {
                    prev.progress++;
                } else {
                    prev.pending++;
                }

                return prev;
            },
            { all: 0, progress: 0, done: 0, pending: 0 }
        );
    }, [data]);

    return (
        <>
            <div className="App">
                <h1>Todo App</h1>

                <Form getTodos={getTodos} />

                <Filters onData={filterData} />

                <TodoStats kpiData={kpiData} />

                <TodoList
                    data={data}
                    openModal={openModal}
                    getTodos={getTodos}
                />
            </div>

            {deleteId !== null && (
                <Modal close={closeModal} confirmDelete={deleteTodo} />
            )}
        </>
    );
}

export default App;