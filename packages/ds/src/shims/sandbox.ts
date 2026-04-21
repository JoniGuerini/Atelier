/* @atelier/ds — shim of src/lib/sandbox.ts.
   O primitivo Example.tsx faz dynamic import disso para abrir
   StackBlitz/CodeSandbox. No pacote distribuido nao queremos
   arrastar o gerador de templates do app de docs — Example fica
   funcional mas o "Open in Sandbox" vira no-op. */

export async function openInStackBlitz(_snippet: string) {
  console.warn("[atelier/ds] openInStackBlitz unavailable in standalone build.");
}

export async function openInCodeSandbox(_snippet: string) {
  console.warn("[atelier/ds] openInCodeSandbox unavailable in standalone build.");
}
