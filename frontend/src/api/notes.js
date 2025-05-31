import api from "./axios";

export const getNotes = async () => {
    const response = await api.get("/notes");
    return response.data.notes || [];
};

export const saveNote =  async (content) => {
    const response = await api.post("/notes", {content});
    return response.data
}

export const deleteNote = async (noteId) => {
  const response = await api.delete(`/notes/${noteId}`);
  return response.data;
};







