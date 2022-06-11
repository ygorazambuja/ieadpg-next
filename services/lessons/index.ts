import { supabase } from "../../database/supabaseClient";
import { ILesson } from "../../entities/lesson";

export async function addLessonInMagazine(lesson: Partial<ILesson>) {
  const { data, error } = await supabase.from("lessons").insert(lesson);

  if (error) {
    throw error;
  }

  return data;
}
