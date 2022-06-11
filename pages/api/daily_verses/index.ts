import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../database/supabaseClient";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const date = dateToYYYYMMDD();

  const { data } = await supabase
    .from("daily_verse")
    .select("*, lesson_id!inner(*)")
    .eq("date", date);

  return response.status(200).json({ data });
}

function dateToYYYYMMDD() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
}
