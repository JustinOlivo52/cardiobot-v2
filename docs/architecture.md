# Architecture

CardioBot v2 separates the clinician workflow from the AI system internals.

## Request Flow

```text
Clinician UI
  -> FastAPI route
  -> agent orchestrator
  -> intent router
  -> specialist agent
  -> safety reviewer
  -> typed response
  -> UI rendering
```

## Agent Roles

- Cardiology Consult Agent: answers clinician questions and structures consult-style guidance.
- ECG Review Agent: interprets ECG image findings and returns a systematic read.
- Medication Dosing Agent: uses deterministic dosing tools first, then explains context and warnings.
- Safety Reviewer: reviews every response for missing context, unsafe advice, and escalation needs.

## Why Typed Responses Matter

V1 returned mostly Markdown. V2 returns structured data so the app can test, audit, render, and monitor the system reliably.
