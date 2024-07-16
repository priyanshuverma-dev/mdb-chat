import axios from "axios";

export const getResponse = async prompt => {
  const res = await axios.post(
    "https://llm.mdb.ai/chat/completions",
    {
      model: "db_test_priyanshu",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      stream: false,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.MINDS_DB_API}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (res.status == 200) {
    return res.data.choices[0].message.content;
  }
  return null;
};
