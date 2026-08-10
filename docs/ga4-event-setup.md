# GA4 — Guia de configuração de eventos

**Propriedade:** waytosantiagoguide.com · **Measurement ID:** `G-GF2GHM795M`
GA carrega só **após consentimento de cookies** (`CookieConsent.astro`) → eventos só contam para visitantes que aceitam.
UI de referência: GA4 redesenhado (2024+). Painel `Administrador` (roda dentada, canto inferior esquerdo) → coluna **Propriedade** → categorias.

---

## Eventos que o código já dispara (nada a mudar no código)

| Evento | Parâmetros | Origem |
|---|---|---|
| `feedback_helpful` | `helpful` (Sim/Não), `page_path` | botões "Este guia foi útil?" (`ShareFeedback.astro`) |
| `share_click` | `method` (whatsapp/native/copy), `page_path` | botões de partilha (`ShareFeedback.astro`) |
| `affiliate_click` | `page_path`, `link_position`, `link_domain`, `link_url`, `link_text` | links Booking/sponsored (`MainLayout.astro`) |
| `outbound_click` | `page_path`, `link_position`, `link_domain`, `link_url`, `link_text` | links externos não-afiliados (`MainLayout.astro`) |

Eventos chegam sozinhos ao `dataLayer`. **Mas** o GA4 não torna os parâmetros consultáveis até os registares como *dimensões personalizadas* (Passo 2). É o passo que falta.

---

## Passo 1 — Confirmar que os eventos chegam

- `Administrador → Apresentação de dados → DebugView` (imediato), ou `Relatórios → Tempo real`.
- Abre o site noutro separador, **aceita cookies**, carrega no 👍/👎.
- Deve aparecer `feedback_helpful` em segundos. Não aparece → cookies não aceites ou adblocker ativo.
- Nota: eventos novos só surgem em `Relatórios → Interação → Eventos` passadas ~24h. DebugView/Tempo real é imediato.

## Passo 2 — Registar dimensões personalizadas (CRÍTICO)

`Administrador → Apresentação de dados → Definições personalizadas → Dimensões personalizadas → Criar dimensões personalizadas`.

Âmbito (Scope) sempre = **Evento**. Criar:

| Nome da dimensão | Âmbito | Parâmetro do evento |
|---|---|---|
| Foi útil | Evento | `helpful` |
| Método de partilha | Evento | `method` |
| Posição do link | Evento | `link_position` |
| Domínio do link | Evento | `link_domain` |
| Texto do link | Evento | `link_text` |
| URL do link | Evento | `link_url` |

- `page_path` não precisa de registo → usa a dimensão nativa "Caminho da página e classe do ecrã".
- ⚠️ Só recolhem valores **a partir do momento em que são criadas** (não retroage no interface; histórico só fica no BigQuery). Criar já.
- ⚠️ Não é possível editar Âmbito nem Parâmetro depois de guardar.
- Limite: 50 dimensões de âmbito Evento (propriedade standard). Folgado.

## Passo 3 — Marcar eventos principais (conversões)

`Administrador → Apresentação de dados → Eventos principais` (ou toggle "Marcar como evento principal" na lista de `Eventos`):
- `affiliate_click` → **SIM** (intenção de receita).
- `outbound_click`, `share_click` → opcional.
- `feedback_helpful` → deixar como evento normal (sinal de qualidade, não conversão).
- Se `affiliate_click` ainda não estiver na lista, aparece após a 1.ª ocorrência.

## Passo 4 — Ver a utilidade da informação (após 24-48h de dados)

`Explorar → Formato livre`:
- Dimensões: `Foi útil` + `Caminho da página`.
- Métrica: `Contagem de eventos`.
- Filtro: `Nome do evento` = `feedback_helpful`.
- Resultado: rácio 👍/👎 por página → identifica guias fracos.

Exploração equivalente para afiliados: dimensões `Posição do link` + `Domínio do link`, filtro `Nome do evento` = `affiliate_click`.

---

## Mapa da UI (redesign 2024+)

`Administrador → Propriedade → Apresentação de dados` contém: `Eventos`, `Eventos principais`, `Público-alvo`, `Definições personalizadas`, `Grupos de canais`, `DebugView`.
(No design antigo estavam soltos na coluna; agora agrupados sob "Apresentação de dados".)

**Estado:** por implementar no painel GA4 (2026-07-12). Código já emite os eventos.
