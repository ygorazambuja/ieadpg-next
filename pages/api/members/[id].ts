import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../database/supabaseClient";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const method = request.method;

  if (method === "GET") {
    return await handleGetById(request, response);
  }
  if (method === "DELETE") {
    return await handleDelete(request, response);
  }
}

async function handleGetById(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const { data, error } = await supabase
      .from("members")
      .select("*")
      .eq("id", request.query.id)
      .limit(1)
      .single();

    if (error) {
      return response.status(500).json({ error });
    }

    return response.status(200).json({ data });
  } catch (error) {
    return response.status(500).json({ error });
  }
}

async function handleDelete(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { data, error } = await supabase
    .from("members")
    .delete()
    .match({ id: request.query.id })
    .single();

  if (error) {
    return response.status(500).json({ error });
  }

  return response.status(200).json({ data });
}
