# CardioBot v2 Roadmap

This checklist tracks the portfolio project from its initial scaffold to a production-style clinical AI demonstration. It does not represent approval for real patient care or medical-device use.

## Foundation

- [x] Review CardioBot v1
- [x] Define the v2 product direction
- [x] Choose React, TypeScript, Next.js, FastAPI, and Python
- [x] Design clinician and admin interfaces
- [x] Add light and dark themes
- [x] Create the frontend and backend scaffolds
- [x] Define typed clinical responses
- [x] Create the initial agent router and orchestrator
- [x] Add a basic safety-review step
- [x] Add initial backend tests and documentation

## Functional Application

- [ ] Trace and understand the complete request flow
- [ ] Connect the frontend to the FastAPI backend
- [ ] Make the clinical case form editable
- [ ] Add loading, error, blocked, and review-required states
- [ ] Build the Cardiology Consult Agent
- [ ] Build deterministic medication-dosing tools
- [ ] Build the Medication Dosing Agent
- [ ] Add ECG image upload and validation
- [ ] Build the ECG Review Agent
- [ ] Strengthen the Safety Reviewer
- [ ] Add guideline and evidence retrieval

## Data and Access

- [ ] Add PostgreSQL
- [ ] Save and reopen cases
- [ ] Build case history
- [ ] Add user authentication
- [ ] Add clinician and administrator roles
- [ ] Add audit logging
- [ ] Establish PHI-safe demo-data rules

## Quality System

- [ ] Create clinical evaluation datasets
- [ ] Add agent-specific and safety tests
- [ ] Add retrieval-quality evaluations
- [ ] Record agent traces, latency, and cost
- [ ] Connect real data to the admin dashboard
- [ ] Build the human-review queue

## Production Engineering

- [ ] Add frontend and backend linting
- [ ] Add integration and end-to-end tests
- [ ] Create a GitHub Actions CI pipeline
- [ ] Add structured logging and monitoring
- [ ] Add rate limiting and failure handling
- [ ] Add secure environment and secret management
- [ ] Complete Docker deployment configuration
- [ ] Deploy a portfolio demonstration
- [ ] Document architecture, safety boundaries, and limitations

## Clinical Readiness Study

- [ ] Create a threat model
- [ ] Document privacy and data-retention requirements
- [ ] Define clinical validation requirements
- [ ] Document model limitations and escalation rules
- [ ] Distinguish the portfolio demonstration from an approved medical device
