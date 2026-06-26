import { useRef } from "react";
import type { TodoStatus } from "../types/todoTypes.ts";

type Props = {
    onData: (data: { q: string; status: TodoStatus | "all" }) => void;
};

function Filters({ onData }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const statusRef = useRef<HTMLSelectElement>(null);

    function setFilters() {
        const inputField = inputRef.current?.value.trim() || "";
        const statusField = statusRef.current?.value as TodoStatus | "all";

        onData({
            q: inputField,
            status: statusField,
        });
    }

    return (
        <div className="filters">
            <input
                id="searchInput"
                ref={inputRef}
                type="text"
                placeholder="Search..."
            />

            <select id="filterInput" ref={statusRef}>
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Done</option>
            </select>

            <button className="delete-btn" onClick={setFilters}>
                Search
            </button>
        </div>
    );
}

export default Filters;