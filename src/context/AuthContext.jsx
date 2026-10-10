"use client";

import React, { createContext, useContext } from "react";
import { useSession } from "@/lib/auth-client";

const AuthContext = createContext({
    user: null,
    session: null,
    isPending: true,
});

export function AuthProvider({ children }) {
    const { data: sessionData, isPending } = useSession();

    const user = sessionData?.user || null;
    const session = sessionData?.session || null;

    return (
        <AuthContext.Provider value={{ user, session, isPending }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}