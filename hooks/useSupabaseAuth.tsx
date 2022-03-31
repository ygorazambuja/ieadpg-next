import { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "../database/supabaseClient";

export function useSupabaseAuth() {
  const [user, setUser] = useState<User>({} as User);
  const [session, setSession] = useState<Session>({} as Session);

  const isAuthenticated = () => {
    return supabase.auth.session()?.user?.aud === "authenticated";
  };

  const initSubscriptions = useCallback(() => {
    const initedSession = supabase.auth.session();

    if (initedSession) {
      setSession(initedSession);
      if (initedSession.user) {
        setUser(initedSession.user);
      }
    }

    supabase.auth.onAuthStateChange((event, session) => {
      handleSignInEvent(event, session!);
    });
  }, []);

  useEffect(initSubscriptions, [initSubscriptions]);

  const handleSignInEvent = (event: AuthChangeEvent, session: Session) => {
    if (event === "SIGNED_IN") {
      if (session) {
        setSession(session);
        setUser(session.user!);
      }
    }
  };

  return {
    initSubscriptions,
    user,
    session,
    isAuthenticated,
  };
}
