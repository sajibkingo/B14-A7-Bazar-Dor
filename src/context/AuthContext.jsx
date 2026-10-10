"use client";

import React, { createContext, useContext } from "react";
import { useSession } from "@/lib/auth-client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const { data: session, isPending, error } = useSession();

    return (
        <AuthContext.Provider
            value={{
                session,
                user: session?.user || null,
                isPending,
                error,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}