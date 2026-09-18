import app from "./app.js";
import http from "http";
import dotenv from "dotenv";
import connectDB from "./db/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`MediShare Backend Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.warn("Starting server without MongoDB:", err.message);
    server.listen(PORT, () => {
      console.log(`MediShare Backend Server is running (Blockchain Mode) on port: ${PORT}`);
    });
  });

server.on("error", (error) => {
  console.error("Server encountered an error:", error.message);
});