/**
 * Vite plugin factory.
 * Roda no closeBundle, depois de tudo gerado.
 */
export function serviceWorkerPlugin(options?: {}): {
    name: string;
    apply: string;
    closeBundle(): void;
};
