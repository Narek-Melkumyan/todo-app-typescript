import type { TodoStatus } from "../types/todoTypes.ts";
import { useRef } from "react";

type Props = {
    getTodos: () => void;
};

function Form({ getTodos }: Props) {
    const titleRef = useRef<HTMLInputElement>(null);
    const selectRef = useRef<HTMLSelectElement>(null);
    const descRef = useRef<HTMLTextAreaElement>(null);

    async function handleSubmit() {
        try {
            const title = titleRef.current?.value.trim();
            const status = selectRef.current?.value as TodoStatus;
            const description = descRef.current?.value.trim();

            if (!title || !status || !description) return;

            const res = await fetch("http://localhost:3002/api/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    description,
                    status,
                }),
            });

            if (!res.ok) {
                throw new Error("Todo error");
            }

            const data = await res.json();
            console.log("Created todo:", data);

            titleRef.current!.value = "";
            descRef.current!.value = "";
            selectRef.current!.value = "pending";
            getTodos();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="form">
            <input id="titleInput" ref={titleRef} type="text" placeholder="Title" />

            <textarea
                id="descriptionInput"
                ref={descRef}
                placeholder="Description"
            ></textarea>

            <select id="statusInput" ref={selectRef}>
                <option value="pending">Pending</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Done</option>
            </select>

            <button id="addBtn" onClick={handleSubmit}>
                Add
            </button>
        </div>
    );
}

export default Form;