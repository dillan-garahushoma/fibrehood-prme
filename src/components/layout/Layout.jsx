import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { SignalLine } from "@/components/common/SignalLine";

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Navbar />
      <SignalLine />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;