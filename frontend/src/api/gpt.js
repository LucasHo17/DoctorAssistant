import api from './axios'; 

export const askDoctor = async (messages) => {
  const response = await api.post("/ask-doctor", { messages });
  return response.data.reply;
};

export const doctorVoice = async (input) => {
  const response = await api.post("/doctor-voice", input, {
    responseType: 'blob',
    headers: { "Content-Type": "application/json" },
  });
  return URL.createObjectURL(response.data);
};
