/* @atelier/ds — shim of src/lib/searchIndex.ts.
   SearchPalette nao e exportado no pacote, mas precisa buildar. */

export interface SearchEntry {
  id: string;
  label: string;
  route: string;
  keywords: string[];
  type?: string;
}

export const searchIndex: SearchEntry[] = [];

export function buildSearchIndex(_dict: any): SearchEntry[] {
  return [];
}
