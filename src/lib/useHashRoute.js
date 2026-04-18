import { useEffect, useState, useCallback } from "react";

function readHash() {
  const h = window.location.hash.replace(/^#\/?/, "");
  return h || "overview";
}

export function useHashRoute() {
  const [route, setRoute] = useState(readHash);

  useEffect(() => {
    const onHash = () => setRoute(readHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = useCallback((to) => {
    const next = `#/${to}`;
    if (window.location.hash !== next) {
      window.location.hash = next;
    } else {
      setRoute(to);
    }
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, []);

  return [route, navigate];
}
