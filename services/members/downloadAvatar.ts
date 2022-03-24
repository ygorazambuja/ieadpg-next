import { supabase } from "../../database/supabaseClient";

export async function downloadImage(path: string) {
  try {
    const { data, error } = await supabase.storage
      .from("members-profile-avatar")
      .download(path);

    if (error) {
      throw error;
    }
    if (!data) {
      return "";
    }

    const url = URL.createObjectURL(data);
    return url;
  } catch (error) {
    throw new Error("Erro ao baixar imagem");
  }
}
