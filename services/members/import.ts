import axios from "axios";

export async function memberImportFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios({
      method: "POST",
      url: "https://ieadpg-api.herokuapp.com/import",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    return { data: response.data };
  } catch (error) {
    throw new Error("Error importing member");
  }
}
