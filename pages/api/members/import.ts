import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../database/supabaseClient";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const member = request.body;

  const { data } = await supabase.from("members").insert(member);

  return response.status(200).json({ data });
}
