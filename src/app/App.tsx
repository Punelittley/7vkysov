import { useState, useEffect } from "react";
import Site from "./Site";
import TabletTerminal from "./TabletTerminal";

const checkIsTablet = () => {
  if (typeof window === "undefined") return false;
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const search = window.location.search.toLowerCase();
  return (
    path.includes("tabletzakazeda") ||
    hash.includes("tabletzakazeda") ||
    search.includes("tabletzakazeda")
  );
};

export default function App() {
  const [isTablet, setIsTablet] = useState<boolean>(checkIsTablet);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsTablet(checkIsTablet());
    };

    window.addEventListener("hashchange", handleRouteChange);
    window.addEventListener("popstate", handleRouteChange);
    return () => {
      window.removeEventListener("hashchange", handleRouteChange);
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  const handleExitTablet = () => {
    if (window.location.hash.toLowerCase().includes("tabletzakazeda")) {
      window.location.hash = "";
    } else {
      const base = import.meta.env.BASE_URL || "/";
      window.history.pushState(null, "", base);
    }
    setIsTablet(false);
  };

  if (isTablet) {
    return <TabletTerminal onExit={handleExitTablet} />;
  }

  return <Site />;
}
