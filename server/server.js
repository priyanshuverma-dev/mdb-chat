import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.MINDS_DB_API,
  basePath: "https://llm.mdb.ai/",
});

const mindsName = "custom-gpt";

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Hello World",
  });
});

app.get("/image", async (req, res) => {
  res.status(200).send({
    message: "I am ready",
  });
});

// chat GPT...
app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    if (req.body.prompt === "") {
      const response = await openai.createCompletion({
        model: mindsName,
        prompt: [
          {
            role: "user",
            content: "How many three-bedroom houses were sold in 2008?",
          },
        ],
        temperature: 0.9,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.6,
        stop: ["user:", " AI:"],
      });

      res.status(200).send({
        bot: response.data.choices[0].text,
      });
    } else {
      const response = await openai.createCompletion({
        model: mindsName,
        prompt: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.9,
        max_tokens: 3000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.6,
        stop: [" user:", " AI:"],
      });

      res.status(200).send({
        bot: response.data.choices[0].text,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

// DALL-E 2 GPT
app.post("/image", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const size = req.body.size;

    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: size,
    });

    res.status(200).send({
      image: response.data.data[0].url,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
