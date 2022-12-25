// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { supabase } from "../../database/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.body;

  const { data, error } = await supabase.auth.signInWithOtp({ email });

  if (error) {
    return res.status(500).json({ error });
  }
  return res.status(200).json({ data });
}
