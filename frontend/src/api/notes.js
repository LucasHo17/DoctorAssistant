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

export const updateNoteTitle = async (note_id, new_title) => {
  const response = await api.patch("/notes/update-title", {
    note_id,
    new_title
  });
  return response.data;
};







