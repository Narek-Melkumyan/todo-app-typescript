import type { Request, Response } from "express";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../config/db.js";
import type {Todo, TodoCreate, TodoStatus} from "../types/todoType.js";

type TodoRow = Todo & RowDataPacket;

export const getTodos = async (req: Request, res: Response) => {
    try {
        const [rows] = await db.query<TodoRow[]>(
            "SELECT * FROM todos ORDER BY id DESC"
        );

        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const getTodoById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const [rows] = await db.query<TodoRow[]>(
            "SELECT * FROM todos WHERE id = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const createTodo = async (
    req: Request<{}, {}, TodoCreate>,
    res: Response
) => {
    try {
        const { title, description = "", status = "pending" } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const [result] = await db.query<ResultSetHeader>(
            "INSERT INTO todos (title, description, status) VALUES (?, ?, ?)",
            [title, description, status]
        );

        res.status(201).json({
            id: result.insertId,
            title, description, status
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const updateTodoStatus = async (
    req: Request<{ id: string }, {}, { status: TodoStatus }>,
    res: Response
) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: "Status is required" });
        }

        const [result] = await db.query<ResultSetHeader>(
            "UPDATE todos SET status = ? WHERE id = ?",
            [status, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.json({ message: "Todo status updated" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const deleteTodo = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const { id } = req.params;

        const [result] = await db.query<ResultSetHeader>(
            "DELETE FROM todos WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.json({ message: "Todo deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
export const searchTodos = async (
    req: Request<{}, {}, {}, { q?: string; status?: TodoStatus }>,
    res: Response
) => {
    try {
        const { q, status } = req.query;

        let sql = "SELECT * FROM todos WHERE 1=1";
        const values: string[] = [];

        if (q) {
            sql += " AND (title LIKE ? OR description LIKE ?)";
            values.push(`%${q}%`, `%${q}%`);
        }

        if (status) {
            sql += " AND status = ?";
            values.push(status);
        }

        sql += " ORDER BY id DESC";

        const [rows] = await db.query<TodoRow[]>(sql, values);

        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
