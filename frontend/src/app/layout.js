// src/app/layout.js
"use client";

import { SessionProvider } from "next-auth/react";
import NavBar from "./navbar/page";
import "./globals.css"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <NavBar />
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
