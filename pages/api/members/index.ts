import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../database/supabaseClient";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { data, error } = await supabase.from("members").select("*");

  if (error) {
    return response.status(500).json({ error });
  }

  return response.status(200).json({ data });
}
