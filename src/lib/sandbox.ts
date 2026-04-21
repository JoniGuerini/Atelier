/* ================================================================
   sandbox — abrir snippet em StackBlitz / CodeSandbox
   (Roadmap · fase 13.2)
   ----------------------------------------------------------------
   Sem SDK externo. Ambos os serviços aceitam form POST com payload
   de arquivos. Construímos o form em memória, submetemos pra
   _blank, e descartamos. Zero deps, zero overhead em apps que
   nunca abrem sandbox.

   Limitações deliberadas:
     - O snippet do <Example> é envolvido num template mínimo
       (main.tsx + index.html + package.json). Para examples que
       importam vários componentes do Atelier, o template puxa o
       pacote @atelier/ds via npm (assumido publicado).
     - StackBlitz e CodeSandbox aceitam ~100KB de payload via form;
       suficiente pra qualquer Example editorial.
   ================================================================ */

const ATELIER_VERSION = "0.17"; /* alinha com roadmap.meta.version */

interface ProjectFiles {
  [path: string]: string;
}

/* ---- Templates compartilhados ---- */

function buildTemplate(snippet: string, title: string): ProjectFiles {
  /* Envolve o snippet em main.tsx auto-suficiente. Se o snippet
     já tem `export default`, usa direto; senão envolve em <App>. */
  const hasDefaultExport = /export\s+default/.test(snippet);

  const mainTsx = hasDefaultExport
    ? `import React from "react";
import ReactDOM from "react-dom/client";
import "@atelier/ds/styles.css";
${snippet}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
`
    : `import React from "react";
import ReactDOM from "react-dom/client";
import "@atelier/ds/styles.css";

function App() {
${snippet
  .split("\n")
  .map((l) => "  " + l)
  .join("\n")}
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
`;

  return {
    "package.json": JSON.stringify(
      {
        name: slugify(title),
        version: "0.0.0",
        private: true,
        type: "module",
        scripts: { dev: "vite", build: "vite build" },
        dependencies: {
          react: "^18.3.1",
          "react-dom": "^18.3.1",
          "@atelier/ds": ATELIER_VERSION,
        },
        devDependencies: {
          "@vitejs/plugin-react": "^4.3.4",
          typescript: "^5.6.0",
          vite: "^5.4.10",
        },
      },
      null,
      2
    ),
    "index.html": `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>${escapeHtml(title)} — Atelier</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`,
    "src/main.tsx": mainTsx,
    "tsconfig.json": JSON.stringify(
      {
        compilerOptions: {
          target: "ES2022",
          module: "ESNext",
          jsx: "react-jsx",
          moduleResolution: "Bundler",
          strict: true,
          skipLibCheck: true,
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
        },
        include: ["src"],
      },
      null,
      2
    ),
    "vite.config.ts": `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({ plugins: [react()] });
`,
  };
}

/* ---- StackBlitz ---- */
/* https://developer.stackblitz.com/guides/integration/open-from-url
   POST form a https://stackblitz.com/run com files[<path>] */

export function openInStackBlitz(snippet: string, title = "Atelier example"): void {
  if (typeof document === "undefined") return;
  const files = buildTemplate(snippet, title);

  const form = document.createElement("form");
  form.method = "POST";
  form.action = "https://stackblitz.com/run?embed=0&file=src%2Fmain.tsx";
  form.target = "_blank";
  form.style.display = "none";

  for (const [path, contents] of Object.entries(files)) {
    appendInput(form, `project[files][${path}]`, contents);
  }
  appendInput(form, "project[title]", title);
  appendInput(form, "project[description]", `Snippet do Atelier · ${title}`);
  appendInput(form, "project[template]", "node");
  appendInput(form, "project[settings]", JSON.stringify({ compile: { clearConsole: false } }));

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}

/* ---- CodeSandbox ---- */
/* https://codesandbox.io/docs/learn/sandboxes/cli-api#define-api
   POST form a https://codesandbox.io/api/v1/sandboxes/define
   com `parameters` = LZ-string compactado.

   Sem libs: usamos a versão "files" via JSON.stringify simples,
   que CSB também aceita (legacy mas estável). */

export function openInCodeSandbox(snippet: string, title = "Atelier example"): void {
  if (typeof document === "undefined") return;
  const files = buildTemplate(snippet, title);

  /* CSB espera `files: { "path": { content, isBinary? } }` */
  const filesPayload: Record<string, { content: string; isBinary?: boolean }> = {};
  for (const [path, contents] of Object.entries(files)) {
    filesPayload[path] = { content: contents };
  }

  const parameters = btoa(JSON.stringify({ files: filesPayload }));

  const form = document.createElement("form");
  form.method = "POST";
  form.action = "https://codesandbox.io/api/v1/sandboxes/define?file=/src/main.tsx";
  form.target = "_blank";
  form.style.display = "none";

  appendInput(form, "parameters", parameters);

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}

/* ---- helpers ---- */

function appendInput(form: HTMLFormElement, name: string, value: string) {
  const input = document.createElement("textarea");
  input.name = name;
  input.value = value;
  form.appendChild(input);
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60) || "atelier-example";
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
