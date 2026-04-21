# @atelier/ds

> A quiet, editorial design system for React. Components, hooks, tokens.

```bash
npm install @atelier/ds
```

## Usage

```tsx
import "@atelier/ds/styles.css";
import { Button, Card, CardBody } from "@atelier/ds/components";
import { useDebounce } from "@atelier/ds/hooks";
import { tokensByCategory } from "@atelier/ds/tokens";

export default function App() {
  return (
    <Card>
      <CardBody>
        <Button variant="primary">Hello, Atelier</Button>
      </CardBody>
    </Card>
  );
}
```

## Sub-paths

| Path | Contents |
|------|----------|
| `@atelier/ds` | Re-exports of everything (good for tree-shakeable apps) |
| `@atelier/ds/components` | All components |
| `@atelier/ds/hooks` | Reusable hooks (zero-deps) |
| `@atelier/ds/tokens` | Token registry + serializers (CSS, JSON DTCG, TS) |
| `@atelier/ds/contrast` | WCAG 2.x contrast helpers |
| `@atelier/ds/styles.css` | Full stylesheet (tokens + components) |

## Provider

Many components read from `useT()` and `useTheme()`. They work without a
provider (English fallbacks, light theme), but for full control wrap your
app:

```tsx
import { AtelierProvider, ThemeProvider } from "@atelier/ds/components";
import myDict from "./locale/pt-BR.json";

<AtelierProvider locale="pt-BR" dict={myDict}>
  <ThemeProvider>
    <App />
  </ThemeProvider>
</AtelierProvider>
```

## Peer dependencies

- `react >= 18 < 20`
- `react-dom >= 18 < 20`

## License

MIT — see [LICENSE](./LICENSE).
