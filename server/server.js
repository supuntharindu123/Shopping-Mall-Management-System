import express from "express";
import dotenv from "dotenv";
import router from "./router.js";
import connect from "./utillty/dbconnection.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api", router);

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
