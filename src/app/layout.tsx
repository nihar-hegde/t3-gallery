import "~/styles/globals.css";
import "@uploadthing/react/styles.css";

import { GeistSans } from "geist/font/sans";
import { ClerkProvider } from "@clerk/nextjs";
import { TopNav } from "./_components/topnav";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { Toaster } from "~/components/ui/sonner";
import { CSPostHogProvider } from "./_analytics/provider";

export const metadata = {
  title: "T3 Gallery",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <CSPostHogProvider>
        <html lang="en" className={`${GeistSans.variable}  `}>
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <body className={` dark`}>
            <div className="grid-row[auto,1fr] grid h-screen ">
              <TopNav />
              <main className="overflow-y-scroll">{children}</main>
            </div>
            {modal}
            <div id="modal-root" />
            <Toaster />
          </body>
        </html>
      </CSPostHogProvider>
    </ClerkProvider>
  );
}
