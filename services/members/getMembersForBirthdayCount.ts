import { supabase } from "../../database/supabaseClient";

export async function getMembersForBirthdayCount() {
  const { data, count } = await supabase
    .from("members")
    .select("*", { count: "exact" });

  return {
    members: data,
    count,
  };
}
