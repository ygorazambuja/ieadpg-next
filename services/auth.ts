export async function localStorageAuthentication() {
  const supabaseAuthtoken = JSON.parse(
    localStorage.getItem("supabase.auth.token") || ""
  );

  if (supabaseAuthtoken) {
    console.log(supabaseAuthtoken);
  }
}
