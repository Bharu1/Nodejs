import express from "express";
import dotenv from "dotenv";
import path from "path";
import connectToDB from "./config/connectToDB.js"; 
import userRouter from "./routes/user.js";

dotenv.config({ path: path.join(process.cwd(), "config/config.env") }); 

const app = express();
const PORT = process.env.PORT || 3000;

connectToDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", userRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: "An unexpected error occurred",
    details: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
