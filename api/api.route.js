import { Router } from "express";
import expensesRouter from "./expenses/expenses.route.js";
import todosRouter from "./todos/todos.route.js";

const apiRouter = Router();

// apiRouter.get("/", async (req, res) => {
//   res.redirect("/api");
// });

apiRouter.use("/expenses", expensesRouter);
apiRouter.use("/todos", todosRouter);
export default apiRouter;
