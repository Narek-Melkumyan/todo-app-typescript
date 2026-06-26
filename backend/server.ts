import express from "express";
import cors from "cors";
import "dotenv/config";
import todoRoutes from "./src/routes/todoRoutes";

const app = express();

const PORT = process.env.PORT || 3002;

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Todo API is running" });
});

app.use("/api/todos", todoRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});