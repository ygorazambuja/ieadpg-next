import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../database/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  supabase.auth.api.setAuthCookie(req, res);
}
