/**
 * Vite plugin factory. Roda no closeBundle (depois do build SSG/SPA).
 * Lê routes.ts, gera sitemap.xml, escreve em outDir/sitemap.xml.
 */
export function sitemapPlugin(options?: {}): {
    name: string;
    apply: string;
    closeBundle(): void;
};
