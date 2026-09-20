import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connection } from "./src/db.js";
import { router } from "./src/routes.js";
import path from "path";

const app = express();
app.use(express.static(path.resolve("public")));

const allowedOrigins = [
  "http://localhost:5173",
  "https://cada-do-hamburguer.vercel.app",
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
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      if (
        origin.startsWith("https://cada-do-hamburguer-") &&
        origin.endsWith(".vercel.app")
      ) {
        return callback(null, true);
      }

      return callback(new Error("Origin não permitida pelo CORS"));
    },
    credentials: true,
  }),
);

app.use(router);

connection();

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
