"use client";

import { ThemeProvider } from "next-themes";
import { TripsContextProvider } from "@/context/TripsContext";
import { AppProvider } from "@/context/AppContext";
import { TripContextProvider } from "@/context/TripContext";
import { AppQueryContextProvider } from "@/context/AppQueryContext";
import { TourEditProvider } from "@/context/TourEditContext";
import { TourImagesProvider } from "@/context/TourImagesContext";
import { SessionProvider } from "next-auth/react";

export default function ClientLayout({ children }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TourImagesProvider>
          <TripContextProvider>
            <TripsContextProvider>
              <TourEditProvider>
                <AppQueryContextProvider>
                  <AppProvider>{children}</AppProvider>
                </AppQueryContextProvider>
              </TourEditProvider>
            </TripsContextProvider>
          </TripContextProvider>
        </TourImagesProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
