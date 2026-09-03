# CardioBot v2

CardioBot v2 is a production-oriented rebuild of the original CardioBot proof of concept.

The goal is to learn and demonstrate how a clinician-facing AI system can be structured with:

- A React/TypeScript frontend
- A FastAPI backend
- Typed agent responses
- Deterministic clinical tools
- Safety review before final output
- Evaluation and monitoring surfaces separated from the clinician workflow

## Project Shape

```text
cardiobot-v2/
├── backend/       FastAPI, agents, schemas, tests
├── frontend/      React/Next.js clinician and admin UI
└── docs/          Architecture, safety, learning notes
```

## Learning Path

1. Understand the request/response contract.
2. Build simple deterministic agents.
3. Add orchestration and safety review.
4. Replace stubs with model-backed agents.
5. Add retrieval, evals, traces, and deployment.

Follow the current build status in the [project roadmap](docs/roadmap.md).

## Clinical Boundary

This project is for portfolio and educational purposes. It is not a medical device, does not diagnose independently, and should not be used for real patient care without clinical validation, compliance review, and appropriate protected health information controls.
