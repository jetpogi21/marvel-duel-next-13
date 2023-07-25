"use client";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { useState, useEffect, FC } from "react";
import { Toaster } from "@/components/ui/Toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface ClientProvidersProps {
  children: React.ReactNode;
}

const ClientProviders: FC<ClientProvidersProps> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 60 * 1000 } },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <SessionProvider refetchOnWindowFocus={false}>{children}</SessionProvider>
    </QueryClientProvider>
  );
};

export default ClientProviders;
