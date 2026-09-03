import type { CaseContext, CaseQuestionResponse } from "@/types/api";

export const demoCase: CaseContext = {
  caseId: "DEMO-1042",
  age: 64,
  sex: "M",
  weightKg: 92,
  setting: "ED",
  chiefConcern: "Chest pain",
  allergies: "Unknown",
};

export const demoResponse: CaseQuestionResponse = {
  agent: "cardiology_consult",
  summary: "Chest pain presentation requires urgent ACS evaluation.",
  clinicalImpression:
    "Acute coronary syndrome should remain high on the differential until ECG, troponin trend, and vital signs are reviewed.",
  recommendedActions: [
    "Obtain a 12-lead ECG now and repeat if symptoms persist or initial ECG is non-diagnostic.",
    "Draw high-sensitivity troponin now and repeat per local protocol.",
    "Assess hemodynamic stability, oxygenation, bleeding risk, and medication contraindications.",
    "Use guideline-directed ACS therapy only after contraindications are reviewed.",
  ],
  rationale: {
    keyFacts: [
      "Care setting is ED.",
      "Chief concern is chest pain.",
      "Age and weight are available for risk context and medication workflows.",
    ],
    differentialConsiderations: [
      "Acute coronary syndrome",
      "Aortic dissection",
      "Pulmonary embolism",
      "Pericarditis or myocarditis",
      "Non-cardiac chest pain",
    ],
    missingData: [
      "12-lead ECG",
      "high-sensitivity troponin trend",
      "vital signs trend",
      "current medications",
      "cardiac risk factors",
    ],
  },
  safetyFlags: [
    "Escalate immediately for hypotension, dynamic ECG changes, ongoing ischemic pain, or instability.",
    "Verify allergies and bleeding risk before antiplatelet or anticoagulant therapy.",
  ],
  trace: {
    route: "cardiology_consult",
    toolsUsed: ["case_context_parser", "safety_reviewer"],
    safetyStatus: "review_required",
    latencyMs: 1240,
  },
};

export const caseHistory = [
  { caseId: "DEMO-1041", date: "May 21, 2025", status: "Saved" },
  { caseId: "DEMO-1040", date: "May 20, 2025", status: "Saved" },
  { caseId: "DEMO-1039", date: "May 19, 2025", status: "Review" },
  { caseId: "DEMO-1038", date: "May 18, 2025", status: "Saved" },
];

export const adminRows = [
  { caseId: "case_01J7V6M5F", agent: "Dosing Advisor", type: "Dose exceeds max limit", severity: "High", status: "Review Required" },
  { caseId: "case_01J6ZP9Q8", agent: "ECG Review", type: "Missing image quality", severity: "Medium", status: "Review Required" },
  { caseId: "case_01J5XDM4H", agent: "Triage", type: "Urgent escalation flagged", severity: "High", status: "Under Review" },
];
