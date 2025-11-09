# AI Agent Workflow Log

## Agents Used
- GitHub Copilot (inline + chat)
- Cursor Agent (multi-file generation)
- Claude Code (refactor & tests)
- ChatGPT (planning + scaffolding)

## Prompts & Outputs
### Example 1 — Generate hexagonal layers
**Prompt:** "Create TypeScript hexagonal architecture folders (core domain, application, ports; adapters inbound/outbound) for FuelEU routes, CB, banking, pooling."
**Output (excerpt):**
- `core/domain/Route.ts` with types
- `core/application/ComputeCB.ts` use case
- `adapters/inbound/http/routesRouter.ts`

### Example 2 — Refine pooling invariant tests
**Prompt:** "Write Jest tests to ensure pooling never leaves a deficit ship worse and never makes a surplus ship negative."
**Output:** A failing test for an edge case (float rounding).  
**Correction:** Added `toFixed(2)` rounding and safe min/max guards in `CreatePool.ts`.

## Validation / Corrections
- Manually verified formulae against FuelEU guidance Annex I/IV and Articles 20–21.
- Wrote unit tests for `ComputeComparison`, `ComputeCB`, `BankSurplus`, `ApplyBanked`, `CreatePool`.
- Adjusted types to `strict` TS and added narrow types for domain IDs.

## Observations
- **Saves time:** Boilerplate, router wiring, and test scaffolds.
- **Failures:** Hallucinated Prisma fields; corrected to match schema.
- **Combo:** Used Copilot for repetitive types, Claude for refactors, Cursor Agent for multi-file edits.

## Best Practices Followed
- Kept frameworks at the edges (adapters).
- Pure domain logic in `core/application` with no Express/React imports.
- Small, focused prompts for codegen; broader prompts for scaffolding.
