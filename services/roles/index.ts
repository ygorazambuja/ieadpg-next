import { supabase } from "../../database/supabaseClient";

type Role = {
  id: string;
  name: string;
  slug: string;
};

type CreateNewRoleDto = Pick<Role, "name">;

export function slugify(name: string) {
  return name.toLowerCase().replace(/ /g, "-");
}

export async function createNewRole(newRole: CreateNewRoleDto) {
  try {
    const { data, error } = await supabase.from("roles").insert({
      name: newRole.name,
      slug: slugify(newRole.name),
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function editRole(role: Role) {
  try {
    const { data, error } = await supabase
      .from("roles")
      .update(role)
      .match({ id: role.id });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function removeRole(id: string) {
  try {
    const { data, error } = await supabase.from("roles").delete().match({ id });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
}
