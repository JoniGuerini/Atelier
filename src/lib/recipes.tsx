import { useState, type ReactNode } from "react";
import {
  Button,
  Input,
  Textarea,
  Badge,
  Avatar,
  AvatarGroup,
  Switch,
  Checkbox,
} from "../ds/primitives.tsx";
import { Card, CardKicker, CardTitle, CardBody, CardFooter } from "../ds/Card.tsx";
import { Field } from "../ds/Field.tsx";
import { Form, FormField, FormActions, FormDivider } from "../ds/Form.tsx";
import { Alert, AlertContent, AlertTitle, AlertDescription } from "../ds/Alert.tsx";
import { Stepper, Step } from "../ds/Stepper.tsx";

/* ================================================================
   Recipes — Roadmap · fase 13.3
   ----------------------------------------------------------------
   Composições curadas que mostram o Atelier em ação. Cada receita
   é renderizada AO VIVO na página /recipes (não é screenshot), e
   tem snippet exportável + sandbox + edição inline.

   O snippet é o conteúdo que vai pro StackBlitz/CodeSandbox via
   o template em sandbox.ts — assume o pacote @atelier/ds publicado.
   ================================================================ */

export interface Recipe {
  id: string;
  category: "form" | "layout" | "data" | "marketing";
  /** Componente React real, renderizado na galeria. */
  preview: ReactNode;
  /** Snippet pronto pra colar (assume @atelier/ds disponível). */
  snippet: string;
}

/* ============================================================ */
/* 1 · LoginForm                                                */
/* ============================================================ */
type LoginPhase = "idle" | "submitting" | "ok" | "error";

function LoginFormPreview() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phase, setPhase] = useState<LoginPhase>("idle");

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (!email || password.length < 6) {
      setPhase("error");
      return;
    }
    setPhase("submitting");
    /* simula chamada async — em app real viria do api/auth */
    setTimeout(() => setPhase("ok"), 700);
  };

  const reset = () => {
    setEmail("");
    setPassword("");
    setPhase("idle");
  };

  if (phase === "ok") {
    return (
      <div style={{ maxWidth: 360, padding: 16 }}>
        <Alert variant="ok">
          <AlertContent>
            <AlertTitle>Bem-vindo, {email}.</AlertTitle>
            <AlertDescription>
              Em uma app real, você seria redirecionado pra dashboard. Reset abaixo pra testar de novo.
            </AlertDescription>
          </AlertContent>
        </Alert>
        <div style={{ marginTop: 12 }}>
          <Button size="sm" variant="ghost" onClick={reset}>
            Tentar de novo
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Form onSubmit={onSubmit} maxWidth={360}>
      {phase === "error" && (
        <Alert variant="danger">
          <AlertContent>
            <AlertDescription>
              E-mail ou senha inválidos. Senha precisa de pelo menos 6 caracteres.
            </AlertDescription>
          </AlertContent>
        </Alert>
      )}
      <FormField label="Email">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          autoComplete="email"
          disabled={phase === "submitting"}
        />
      </FormField>
      <FormField label="Senha" hint="Mínimo 6 caracteres">
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          disabled={phase === "submitting"}
        />
      </FormField>
      <FormActions>
        <Button type="button" variant="ghost" size="sm" disabled={phase === "submitting"}>
          Esqueci a senha
        </Button>
        <Button type="submit" variant="primary" size="sm" disabled={phase === "submitting"}>
          {phase === "submitting" ? "Entrando…" : "Entrar"}
        </Button>
      </FormActions>
    </Form>
  );
}

/* ============================================================ */
/* 2 · Settings page                                            */
/* ============================================================ */
function SettingsPreview() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 480 }}>
      <Card>
        <CardKicker>Conta</CardKicker>
        <CardTitle>Notificações</CardTitle>
        <CardBody>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              fontFamily: "var(--font-serif)",
              fontSize: 14,
              color: "var(--ink-soft)",
            }}
          >
            {/* Switch do Atelier passa BOOLEAN (não event) — onChange={setX} */}
            <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>E-mails de atividade</span>
              <Switch checked={emailNotif} onChange={setEmailNotif} />
            </label>
            <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Novidades e promoções</span>
              <Switch checked={marketing} onChange={setMarketing} />
            </label>
            {savedAt && (
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--ok)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                ✓ salvo às {savedAt}
              </span>
            )}
          </div>
        </CardBody>
        <CardFooter>
          <Button
            size="sm"
            onClick={() =>
              setSavedAt(
                new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
              )
            }
          >
            Salvar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

/* ============================================================ */
/* 3 · Pricing                                                  */
/* ============================================================ */
function PricingPreview() {
  const [picked, setPicked] = useState<string | null>(null);
  const tiers = [
    { name: "Starter", price: "Grátis", desc: "Para começar", cta: "default" as const, features: ["Até 3 projetos", "1 GB de storage", "Comunidade"] },
    { name: "Pro", price: "R$ 49/mês", desc: "Para times pequenos", cta: "primary" as const, features: ["Projetos ilimitados", "100 GB", "Suporte prioritário", "Histórico de 90 dias"] },
    { name: "Studio", price: "R$ 199/mês", desc: "Equipes em escala", cta: "default" as const, features: ["Tudo do Pro", "SSO", "SLA dedicado"] },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 720 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {tiers.map((t) => (
          <Card key={t.name}>
            <CardKicker>{t.desc}</CardKicker>
            <CardTitle>{t.name}</CardTitle>
            <CardBody>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 24, color: "var(--ink)", marginBottom: 12 }}>
                {t.price}
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6, fontSize: 13, color: "var(--ink-soft)" }}>
                {t.features.map((f) => (
                  <li key={f}>· {f}</li>
                ))}
              </ul>
            </CardBody>
            <CardFooter>
              <Button
                variant={picked === t.name ? "primary" : t.cta}
                size="sm"
                onClick={() => setPicked(t.name)}
              >
                {picked === t.name ? "✓ Escolhido" : "Escolher"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {picked && (
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--ink-soft)",
            margin: 0,
          }}
        >
          Plano selecionado: <strong style={{ color: "var(--accent)" }}>{picked}</strong> · em uma app real, próximo passo: checkout
        </p>
      )}
    </div>
  );
}

/* ============================================================ */
/* 4 · Comment thread                                           */
/* ============================================================ */
interface Comment {
  id: number;
  name: string;
  initials: string;
  time: string;
  body: string;
}
const INITIAL_COMMENTS: Comment[] = [
  { id: 1, name: "Clara A.",    initials: "CA", time: "há 2h", body: "A nova paleta funciona bem em dark — só achei o accent meio quente em modais." },
  { id: 2, name: "J. Mesquita", initials: "JM", time: "há 1h", body: "Concordo. Vou abrir um issue. O contraste passa AAA mas a temperatura puxa demais." },
];

function CommentThreadPreview() {
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [reply, setReply] = useState("");

  const onSend = () => {
    const trimmed = reply.trim();
    if (!trimmed) return;
    setComments((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "Você",
        initials: "VC",
        time: "agora",
        body: trimmed,
      },
    ]);
    setReply("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 480 }}>
      {comments.map((c) => (
        <article key={c.id} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 12 }}>
          <Avatar initials={c.initials} size="sm" />
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <strong style={{ fontFamily: "var(--font-serif)", fontSize: 14 }}>{c.name}</strong>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", color: "var(--ink-faint)" }}>
                {c.time}
              </span>
            </div>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: 14, lineHeight: 1.55, color: "var(--ink-soft)", margin: "4px 0 0" }}>
              {c.body}
            </p>
          </div>
        </article>
      ))}
      <Field>
        <Textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Responder…"
          rows={3}
          onKeyDown={(e) => {
            /* Cmd/Ctrl+Enter envia — atalho editorial comum */
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
              e.preventDefault();
              onSend();
            }
          }}
        />
      </Field>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          size="sm"
          variant="primary"
          disabled={reply.trim().length === 0}
          onClick={onSend}
        >
          Enviar
        </Button>
      </div>
    </div>
  );
}

/* ============================================================ */
/* 5 · Onboarding stepper                                       */
/* ============================================================ */
function OnboardingPreview() {
  const [step, setStep] = useState(1);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 560 }}>
      <Stepper current={step} orientation="horizontal">
        <Step n={1} label="Conta" description="Seus dados" />
        <Step n={2} label="Workspace" description="Onde criar" />
        <Step n={3} label="Convidar" description="Time inicial" />
      </Stepper>
      <Alert variant="info">
        <AlertContent>
          <AlertTitle>Etapa {step} de 3</AlertTitle>
          <AlertDescription>
            Onboarding linear é raro. Use Stepper só quando faz sentido a sequência ser obrigatória — pra explorar, prefira navegação livre.
          </AlertDescription>
        </AlertContent>
      </Alert>
      <div style={{ display: "flex", gap: 8, justifyContent: "space-between" }}>
        <Button size="sm" variant="ghost" disabled={step === 1} onClick={() => setStep((s) => Math.max(1, s - 1))}>
          ← Voltar
        </Button>
        <Button size="sm" variant="primary" disabled={step === 3} onClick={() => setStep((s) => Math.min(3, s + 1))}>
          {step === 3 ? "Concluir" : "Avançar →"}
        </Button>
      </div>
    </div>
  );
}

/* ============================================================ */
/* 6 · Subscribe / newsletter                                   */
/* ============================================================ */
function SubscribePreview() {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [subscribed, setSubscribed] = useState<string | null>(null);

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (!email || !agreed) return;
    setSubscribed(email);
  };

  if (subscribed) {
    return (
      <Card>
        <CardKicker>Newsletter</CardKicker>
        <CardTitle>Você está dentro.</CardTitle>
        <CardBody>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: 14, lineHeight: 1.55, color: "var(--ink-soft)", margin: 0 }}>
            A próxima edição vai pra <strong style={{ color: "var(--ink)" }}>{subscribed}</strong>.
          </p>
        </CardBody>
        <CardFooter>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setSubscribed(null);
              setEmail("");
              setAgreed(false);
            }}
          >
            Assinar de novo (demo)
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardKicker>Newsletter</CardKicker>
      <CardTitle>Receba o Atelier</CardTitle>
      <CardBody>
        <p style={{ fontFamily: "var(--font-serif)", fontSize: 14, lineHeight: 1.55, color: "var(--ink-soft)", margin: "0 0 16px" }}>
          Uma edição mensal — silenciosa, editorial, sem ruído.
        </p>
        <Form onSubmit={onSubmit}>
          <FormField label="E-mail">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </FormField>
          <Checkbox
            label="Aceito receber comunicações do Atelier"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <FormDivider />
          <FormActions>
            <Button type="submit" variant="primary" size="sm" disabled={!agreed || !email}>
              Assinar
            </Button>
          </FormActions>
        </Form>
      </CardBody>
    </Card>
  );
}

/* ============================================================ */
/* Snippets — string raw para sandbox/copy/edit                 */
/* ============================================================ */

const LOGIN_SNIPPET = `import { useState } from "react";
import {
  Button, Input, Form, FormField, FormActions,
  Alert, AlertContent, AlertTitle, AlertDescription,
} from "@atelier/ds";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phase, setPhase] = useState("idle"); // idle | submitting | ok | error

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || password.length < 6) {
      setPhase("error");
      return;
    }
    setPhase("submitting");
    // simula chamada async
    setTimeout(() => setPhase("ok"), 700);
  };

  if (phase === "ok") {
    return (
      <Alert variant="ok">
        <AlertContent>
          <AlertTitle>Bem-vindo, {email}.</AlertTitle>
          <AlertDescription>Em app real, redirect pra dashboard.</AlertDescription>
        </AlertContent>
      </Alert>
    );
  }

  return (
    <Form onSubmit={onSubmit} maxWidth={360}>
      {phase === "error" && (
        <Alert variant="danger">
          <AlertContent>
            <AlertDescription>
              Senha precisa de pelo menos 6 caracteres.
            </AlertDescription>
          </AlertContent>
        </Alert>
      )}
      <FormField label="Email">
        <Input type="email" value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com" autoComplete="email"
          disabled={phase === "submitting"} />
      </FormField>
      <FormField label="Senha" hint="Mínimo 6 caracteres">
        <Input type="password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          disabled={phase === "submitting"} />
      </FormField>
      <FormActions>
        <Button variant="ghost" size="sm" disabled={phase === "submitting"}>
          Esqueci a senha
        </Button>
        <Button type="submit" variant="primary" size="sm" disabled={phase === "submitting"}>
          {phase === "submitting" ? "Entrando…" : "Entrar"}
        </Button>
      </FormActions>
    </Form>
  );
}`;

const SETTINGS_SNIPPET = `import { useState } from "react";
import { Card, CardKicker, CardTitle, CardBody, CardFooter, Switch, Button } from "@atelier/ds";

export default function App() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [savedAt, setSavedAt] = useState(null);

  // Importante: o Switch do Atelier passa BOOLEAN (não event).
  //   <Switch onChange={setEmailNotif} />        ✓
  //   <Switch onChange={(e) => ...} />           ✗ (e é boolean)

  return (
    <Card>
      <CardKicker>Conta</CardKicker>
      <CardTitle>Notificações</CardTitle>
      <CardBody>
        <label style={{ display: "flex", justifyContent: "space-between" }}>
          <span>E-mails de atividade</span>
          <Switch checked={emailNotif} onChange={setEmailNotif} />
        </label>
        <label style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
          <span>Novidades e promoções</span>
          <Switch checked={marketing} onChange={setMarketing} />
        </label>
        {savedAt && <p>✓ salvo às {savedAt}</p>}
      </CardBody>
      <CardFooter>
        <Button size="sm" onClick={() => setSavedAt(new Date().toLocaleTimeString())}>
          Salvar
        </Button>
      </CardFooter>
    </Card>
  );
}`;

const PRICING_SNIPPET = `import { useState } from "react";
import { Card, CardKicker, CardTitle, CardBody, CardFooter, Button } from "@atelier/ds";

const TIERS = [
  { name: "Starter", price: "Grátis",      desc: "Para começar",         cta: "default", features: ["Até 3 projetos", "1 GB", "Comunidade"] },
  { name: "Pro",     price: "R$ 49/mês",   desc: "Para times pequenos",  cta: "primary", features: ["Ilimitado", "100 GB", "Suporte"] },
  { name: "Studio",  price: "R$ 199/mês",  desc: "Equipes em escala",    cta: "default", features: ["Tudo do Pro", "SSO", "SLA"] },
];

export default function App() {
  const [picked, setPicked] = useState(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {TIERS.map((t) => (
          <Card key={t.name}>
            <CardKicker>{t.desc}</CardKicker>
            <CardTitle>{t.name}</CardTitle>
            <CardBody>
              <div style={{ fontSize: 24, marginBottom: 12 }}>{t.price}</div>
              <ul>{t.features.map((f) => <li key={f}>· {f}</li>)}</ul>
            </CardBody>
            <CardFooter>
              <Button
                variant={picked === t.name ? "primary" : t.cta}
                size="sm"
                onClick={() => setPicked(t.name)}
              >
                {picked === t.name ? "✓ Escolhido" : "Escolher"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {picked && <p>Plano: <strong>{picked}</strong> · próximo: checkout</p>}
    </div>
  );
}`;

const COMMENTS_SNIPPET = `import { useState } from "react";
import { Avatar, Button, Field, Textarea } from "@atelier/ds";

const INITIAL = [
  { id: 1, name: "Clara A.",    initials: "CA", time: "há 2h", body: "A nova paleta funciona bem em dark." },
  { id: 2, name: "J. Mesquita", initials: "JM", time: "há 1h", body: "Concordo. Vou abrir um issue." },
];

export default function App() {
  const [comments, setComments] = useState(INITIAL);
  const [reply, setReply] = useState("");

  const send = () => {
    const text = reply.trim();
    if (!text) return;
    setComments((prev) => [
      ...prev,
      { id: Date.now(), name: "Você", initials: "VC", time: "agora", body: text },
    ]);
    setReply("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {comments.map((c) => (
        <article key={c.id} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 12 }}>
          <Avatar initials={c.initials} size="sm" />
          <div>
            <strong>{c.name}</strong> <span style={{ color: "var(--ink-faint)" }}>· {c.time}</span>
            <p style={{ margin: "4px 0 0", color: "var(--ink-soft)" }}>{c.body}</p>
          </div>
        </article>
      ))}
      <Field>
        <Textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Responder…"
          rows={3}
          onKeyDown={(e) => {
            // Cmd/Ctrl+Enter envia (atalho editorial comum)
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") send();
          }}
        />
      </Field>
      <Button size="sm" variant="primary" disabled={!reply.trim()} onClick={send}>
        Enviar
      </Button>
    </div>
  );
}`;

const ONBOARDING_SNIPPET = `import { useState } from "react";
import { Stepper, Step, Alert, AlertContent, AlertTitle, AlertDescription, Button } from "@atelier/ds";

export default function App() {
  const [step, setStep] = useState(1);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Stepper current={step} orientation="horizontal">
        <Step n={1} label="Conta" description="Seus dados" />
        <Step n={2} label="Workspace" description="Onde criar" />
        <Step n={3} label="Convidar" description="Time inicial" />
      </Stepper>
      <Alert variant="info">
        <AlertContent>
          <AlertTitle>Etapa {step} de 3</AlertTitle>
          <AlertDescription>Onboarding linear é raro. Use Stepper quando a sequência for obrigatória.</AlertDescription>
        </AlertContent>
      </Alert>
      <div style={{ display: "flex", gap: 8, justifyContent: "space-between" }}>
        <Button size="sm" variant="ghost" disabled={step === 1}
          onClick={() => setStep((s) => Math.max(1, s - 1))}>← Voltar</Button>
        <Button size="sm" variant="primary" disabled={step === 3}
          onClick={() => setStep((s) => Math.min(3, s + 1))}>
          {step === 3 ? "Concluir" : "Avançar →"}
        </Button>
      </div>
    </div>
  );
}`;

const SUBSCRIBE_SNIPPET = `import { useState } from "react";
import {
  Card, CardKicker, CardTitle, CardBody, CardFooter,
  Form, FormField, FormDivider, FormActions,
  Input, Button, Checkbox,
} from "@atelier/ds";

export default function App() {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [subscribed, setSubscribed] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !agreed) return;
    setSubscribed(email);
  };

  if (subscribed) {
    return (
      <Card>
        <CardKicker>Newsletter</CardKicker>
        <CardTitle>Você está dentro.</CardTitle>
        <CardBody>
          <p>A próxima edição vai pra <strong>{subscribed}</strong>.</p>
        </CardBody>
        <CardFooter>
          <Button size="sm" variant="ghost" onClick={() => {
            setSubscribed(null); setEmail(""); setAgreed(false);
          }}>
            Assinar de novo (demo)
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardKicker>Newsletter</CardKicker>
      <CardTitle>Receba o Atelier</CardTitle>
      <CardBody>
        <p>Uma edição mensal — silenciosa, editorial, sem ruído.</p>
        <Form onSubmit={onSubmit}>
          <FormField label="E-mail">
            <Input type="email" value={email} required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com" />
          </FormField>
          <Checkbox label="Aceito receber comunicações"
            checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
          <FormDivider />
          <FormActions>
            <Button type="submit" variant="primary" size="sm" disabled={!agreed || !email}>
              Assinar
            </Button>
          </FormActions>
        </Form>
      </CardBody>
    </Card>
  );
}`;

/* ============================================================ */
/* Recipes — registry exportado                                 */
/* ============================================================ */

export const RECIPES: Recipe[] = [
  { id: "login",      category: "form",      preview: <LoginFormPreview />,    snippet: LOGIN_SNIPPET },
  { id: "settings",   category: "form",      preview: <SettingsPreview />,     snippet: SETTINGS_SNIPPET },
  { id: "pricing",    category: "marketing", preview: <PricingPreview />,      snippet: PRICING_SNIPPET },
  { id: "comments",   category: "data",      preview: <CommentThreadPreview />,snippet: COMMENTS_SNIPPET },
  { id: "onboarding", category: "layout",    preview: <OnboardingPreview />,   snippet: ONBOARDING_SNIPPET },
  { id: "subscribe",  category: "marketing", preview: <SubscribePreview />,    snippet: SUBSCRIBE_SNIPPET },
];
