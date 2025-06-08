import express from "express";
import dotenv from "dotenv";
import router from "./router.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connect from "./utillty/dbconnection.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors());
// app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());
app.use("/api", router);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

try {
  const isconnect = connect();
  if (isconnect) {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } else {
    console.log("Server failed to start");
  }
} catch (e) {
  console.error(e);
}
