import express, { Application } from "express";
import dotenv from "dotenv";
import router from "./routes/router"; // Update the import

dotenv.config();

const app: Application = express();

app.get("/", (_req, res) => {
  return res.status(200).json({
    message: "Welcome to the NFT metadata API",
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", router); // Update the base path

const port = process.env.PORT || 9400;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
