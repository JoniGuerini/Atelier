import { useEffect, useState, useCallback } from "react";

export type Navigate = (to: string) => void;

function readHash(): string {
  const h = window.location.hash.replace(/^#\/?/, "");
  return h || "home";
}

export function useHashRoute(): [string, Navigate] {
  const [route, setRoute] = useState<string>(readHash);

  useEffect(() => {
    const onHash = () => setRoute(readHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = useCallback<Navigate>((to) => {
    const next = `#/${to}`;
    if (window.location.hash !== next) {
      window.location.hash = next;
    } else {
      setRoute(to);
    }
    window.scrollTo({
      top: 0,
      behavior: ("instant" in window ? "instant" : "auto") as ScrollBehavior,
    });
  }, []);

  return [route, navigate];
}
