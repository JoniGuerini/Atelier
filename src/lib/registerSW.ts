/* ================================================================
   src/lib/registerSW.ts — registra o service worker em produção
   ----------------------------------------------------------------
   Roadmap · Fase 14.3 (PWA full offline)

   Estratégia:
     - Só registra em produção (import.meta.env.PROD).
     - Em dev: skipDev evita interferir no HMR (qualquer SW ativo
       pode bloquear hot reload do Vite).
     - Quando uma nova versão é detectada (waiting), expõe um hook
       global window.__atelierSwUpdate(callback) que UI futura
       (banner "Nova versão disponível") pode consumir.
     - Sem deps de React aqui — chamado uma vez em main.tsx,
       fora do ciclo de render.
   ================================================================ */

interface SwUpdateContext {
  /** Aplica a atualização imediatamente (forçando reload). */
  apply: () => void;
  /** Ignora — usuário decidiu adiar. */
  dismiss: () => void;
}

type SwUpdateListener = (ctx: SwUpdateContext) => void;

/** Janela tipada com o hook custom. */
declare global {
  interface Window {
    /** Registra um listener pra evento "nova versão SW disponível".
        Chamado quando waiting worker é detectado. */
    __atelierSwUpdate?: (listener: SwUpdateListener) => void;
    /** Service worker registration corrente (debug/inspeção). */
    __atelierSwRegistration?: ServiceWorkerRegistration;
  }
}

const SW_URL = "/sw.js";

let updateListener: SwUpdateListener | null = null;

function notifyUpdate(reg: ServiceWorkerRegistration) {
  if (!updateListener) return;
  const waiting = reg.waiting;
  if (!waiting) return;

  updateListener({
    apply: () => {
      // Manda o waiting worker assumir agora
      waiting.postMessage({ type: "SKIP_WAITING" });
      // Quando o controlador trocar, reload para a nova versão
      const onControllerChange = () => {
        navigator.serviceWorker.removeEventListener(
          "controllerchange",
          onControllerChange
        );
        window.location.reload();
      };
      navigator.serviceWorker.addEventListener(
        "controllerchange",
        onControllerChange
      );
    },
    dismiss: () => {
      // Sem ação — usuário adia até próximo reload natural
    },
  });
}

export function registerServiceWorker() {
  // Sem suporte → noop silencioso
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) {
    return;
  }

  // Em DEV: desregistra agressivamente qualquer SW Atelier ativo
  // (resíduo de builds prod anteriores que pode interferir no HMR
  // e cachear assets antigos, incluindo favicon).
  if (!import.meta.env.PROD) {
    navigator.serviceWorker.getRegistrations().then((regs) => {
      const stale = regs.filter((r) =>
        r.active?.scriptURL?.includes("/sw.js")
      );
      if (stale.length) {
        console.info(
          `[sw] desregistrando ${stale.length} SW(s) antigo(s) (modo dev)`
        );
        stale.forEach((r) => r.unregister());
      }
    });
    // Também limpa caches Atelier em dev — assets stale não mais úteis
    if ("caches" in window) {
      caches.keys().then((keys) => {
        keys
          .filter((k) => k.startsWith("atelier-"))
          .forEach((k) => caches.delete(k));
      });
    }
    return;
  }

  // Expor hook global pra UI futura
  window.__atelierSwUpdate = (listener) => {
    updateListener = listener;
  };

  // Registrar quando o load do app já tiver terminado
  // (não competir com o paint inicial)
  const doRegister = () => {
    navigator.serviceWorker
      .register(SW_URL, { scope: "/" })
      .then((reg) => {
        window.__atelierSwRegistration = reg;

        // Já tem worker waiting? notifica imediatamente
        if (reg.waiting) {
          notifyUpdate(reg);
        }

        // Listener pra quando uma nova versão for instalada
        reg.addEventListener("updatefound", () => {
          const installing = reg.installing;
          if (!installing) return;
          installing.addEventListener("statechange", () => {
            if (
              installing.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              // Tem versão antiga rodando E uma nova instalada
              notifyUpdate(reg);
            }
          });
        });
      })
      .catch((err) => {
        // Não quebra app — apenas loga
        console.warn("[sw] registration failed:", err);
      });
  };

  if (document.readyState === "complete") {
    doRegister();
  } else {
    window.addEventListener("load", doRegister, { once: true });
  }
}

/** Desregistra todos os service workers — útil em debug e em caso
    de necessidade de "factory reset" do PWA pelo usuário. */
export async function unregisterServiceWorkers() {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) {
    return;
  }
  const regs = await navigator.serviceWorker.getRegistrations();
  await Promise.all(regs.map((r) => r.unregister()));
  // Limpa caches Atelier também
  if ("caches" in window) {
    const keys = await caches.keys();
    await Promise.all(
      keys.filter((k) => k.startsWith("atelier-")).map((k) => caches.delete(k))
    );
  }
}
