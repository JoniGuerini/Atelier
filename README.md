# Atelier — Design System

> Um estudo silencioso em interface. Editorial, refinado, sem ruído.

Atelier é um design system construído em React + Vite, com estética inspirada
em revistas impressas e livros de arquitetura. Cores quentes de papel, tinta
escura, vermelho como anotação à margem. Duas famílias tipográficas — Fraunces
e JetBrains Mono — carregam quase toda a hierarquia.

## Stack

- **React 18** + **Vite 5** — sem roteador externo (hash routing leve).
- **Fraunces** + **JetBrains Mono** (Google Fonts).
- **CSS puro** com variáveis CSS como design tokens.
- Zero dependências além de `react` e `react-dom`.

## Rodando

```bash
npm install
npm run dev
```

A aplicação abre em `http://localhost:5173` (ou na próxima porta livre).

## Estrutura

```
src/
├── App.jsx                # Shell: sidebar + conteúdo, por rota hash
├── main.jsx
├── index.css              # Tokens + utilidades + componentes DS
├── components/
│   └── Sidebar.jsx        # Navegação por grupos
├── ds/
│   └── primitives.jsx     # Button, Field, Input, Badge, Modal, …
├── lib/
│   ├── routes.js          # Mapa de navegação
│   └── useHashRoute.js    # Hook de roteamento por hash
└── pages/
    ├── Overview.jsx           (#/overview)
    ├── Principles.jsx         (#/principles)
    ├── Colors.jsx             (#/colors)
    ├── Typography.jsx         (#/typography)
    ├── Spacing.jsx            (#/spacing)
    ├── Icons.jsx              (#/icons)
    ├── Buttons.jsx            (#/buttons)
    ├── Inputs.jsx             (#/inputs)
    ├── Controls.jsx           (#/controls)
    ├── Badges.jsx             (#/badges)
    ├── Alerts.jsx             (#/alerts)
    ├── Cards.jsx              (#/cards)
    ├── TabsPage.jsx           (#/tabs)
    ├── Tables.jsx             (#/tables)
    ├── Overlays.jsx           (#/overlays)
    ├── Feedback.jsx           (#/feedback)
    ├── DropzonePage.jsx       (#/dropzone)
    ├── Forms.jsx              (#/forms)
    └── EmptyStates.jsx        (#/empty-states)
```

## Tokens

Todos os tokens vivem em `src/index.css`, em `:root`:

- **Superfícies:** `--bg`, `--bg-panel`, `--bg-sunken`, `--bg-inverse`
- **Tinta:** `--ink`, `--ink-soft`, `--ink-faint`, `--ink-inverse`
- **Acento:** `--accent`, `--accent-ink`, `--accent-soft`
- **Semânticas:** `--ok`, `--warn`, `--danger`, `--info` (+ versões `*-soft`)
- **Espaçamento:** `--space-1` … `--space-9` (base 8pt)
- **Motion:** `--ease`, `--dur-fast`, `--dur`, `--dur-slow`

## Princípios

1. **Silêncio como default** — a cor mais ruidosa é usada com parcimônia.
2. **Tipografia antes de pixels** — hierarquia vem da fonte, não da cor.
3. **Ângulos retos** — nenhum border-radius, nenhuma sombra.
4. **Medida humana** — linhas nunca ultrapassam 70 caracteres.
5. **Gestos previsíveis** — movimento entre 120 e 320 ms.
6. **Acessível por construção** — foco visível, contraste ≥ 4.5:1.

## Origem

O projeto nasceu como um pequeno conversor de CSV para JSON. Esse componente
inicial sobrevive, com carinho, na página `#/dropzone`.
