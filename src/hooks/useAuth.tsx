import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  user: import("@supabase/supabase-js").User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<import("@supabase/supabase-js").User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check session on load
    supabase.auth.getSession().then(({ data }) => {
      setUser(data?.session?.user || null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (data?.user) setUser(data.user);
    return { error };
  };

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (data?.user) setUser(data.user);
    return { error };
  };

  const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  setUser(null); // clear user state
  return { error };
};


  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
  {children}
</AuthContext.Provider>

  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
