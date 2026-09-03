# Safety Model

CardioBot v2 is clinician-facing decision support for educational portfolio use.

## Core Rules

- Do not present model output as a diagnosis.
- Do not invent medication doses.
- Ask for missing context when risk-sensitive information is absent.
- Escalate urgent or unstable presentations.
- Keep real PHI out of demo data.
- Store demo case history by case ID, not patient name.

## Safety Reviewer

Every specialist agent response passes through a safety reviewer before being returned to the frontend. The reviewer can add flags, require human review, or mark an output as blocked.
