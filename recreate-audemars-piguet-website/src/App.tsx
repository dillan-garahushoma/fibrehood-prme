import { useState } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Gallery from "./components/Gallery";

type View = "home" | "gallery";

export default function App() {
  const [view, setView] = useState<View>("home");

  return (
    <div className="min-h-screen">
      <Header dark={view === "gallery"} onLogoClick={() => setView("home")} />
      {view === "home" ? (
        <Home onDiscoverMore={() => setView("gallery")} />
      ) : (
        <Gallery />
      )}
    </div>
  );
}
