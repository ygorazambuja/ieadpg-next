import { supabase } from "../../database/supabaseClient";
import { IMagazine } from "../../entities/magazine";

export async function insertMagazine(magazine: IMagazine) {
  const { data, error } = await supabase.from("magazines").insert(magazine);

  if (error) {
    throw error;
  }

  return data;
}

export async function getMagazineById(id: number | string) {
  const { data, error } = await supabase
    .from("magazines")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}
