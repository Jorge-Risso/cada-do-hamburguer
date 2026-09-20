import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connection } from "./src/db.js";
import { router } from "./src/routes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://cada-do-hamburguer-git-main-project00s-projects.vercel.app",
  "https://cada-do-hamburguer-6u2tz98q3-project00s-projects.vercel.app",
];

app.use(express.json({ limit: "10mb" }));

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  }),
);

app.use(cookieParser());

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.use(router);

connection();

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
