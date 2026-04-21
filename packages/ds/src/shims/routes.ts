/* @atelier/ds — shim of src/lib/routes.ts.
   Componentes do app de docs (PageNav) dependem disso mas nao
   sao parte do barrel publico. Stubs garantem que o build passa
   se forem importados em algum lugar. */

export const FLAT_ROUTES: { id: string; n: string }[] = [];
export const ROUTES: { groupKey: string; items: any[] }[] = [];
export const ALL_ROUTE_IDS: string[] = [];
export const ROUTE_BY_ID: Record<string, string> = {};

export function findFlatIndex(_id: string): number {
  return -1;
}
