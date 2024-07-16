import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { getResponse } from "./helper.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  return res.status(200).send({
    message: "Hello World",
  });
});

// chat GPT...
app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const message = await getResponse(prompt);

    if (res != null) {
      return res.status(200).send({ bot: message });
    }

    return res.status(500).send({ error: "Internal Server Error" });
  } catch (error) {
    console.log(error.data);
    return res.status(500).send({ error: error.data });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port 5000");
});
