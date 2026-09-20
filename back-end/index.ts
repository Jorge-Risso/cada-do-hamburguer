import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connection } from "./src/db.js";
import { router } from "./src/routes.js";

const app = express();

const allowedOrigins = ["http://localhost:5173"];

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
      // Permite requisições sem Origin
      // (ex: Postman ou chamadas internas)
      if (!origin) {
        return callback(null, true);
      }

      // Permite localhost
      if (origin === "http://localhost:5173") {
        return callback(null, true);
      }

      // Permite qualquer URL do projeto Vercel
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
