import { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "../database/supabaseClient";

export function useSupabaseAuth() {
  const [user, setUser] = useState<User>({} as User);
  const [session, setSession] = useState<Session>({} as Session);

  const isAuthenticated = useMemo(async () => {
    const authSession = await supabase.auth.getSession();

    if (authSession.data) {
      return authSession.data.session?.user?.aud === "authenticated";
    }

    return false;
  }, []);

  const initSubscriptions = useCallback(async () => {
    const initedSession = await supabase.auth.getSession();

    if (initedSession.data.session) {
      setSession(initedSession.data.session);
      if (initedSession.data.session.user) {
        setUser(initedSession.data.session.user);
      }
    }

    supabase.auth.onAuthStateChange((event, session) => {
      handleSignInEvent(event, session!);
    });
  }, []);

  useEffect(() => {
    initSubscriptions();
  }, [initSubscriptions]);

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
