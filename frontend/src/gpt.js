import axios from "axios";

const OPENAI_API_KEY = "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";

export async function getDoctorReply(prompt) {
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `I'm a patient. ${prompt}` }],
      temperature: 0.7,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
    }
  );

  return response.data.choices[0].message.content;
}
