export type AgentName = "cardiology_consult" | "ecg_review" | "medication_dosing";
export type SafetyStatus = "passed" | "review_required" | "blocked";

export type CaseContext = {
  caseId: string;
  age: number;
  sex: "M" | "F" | "Other" | "Unknown";
  weightKg: number;
  setting: "ED" | "ICU" | "Clinic" | "EMS";
  chiefConcern: string;
  allergies: string;
};

export type ClinicalRationale = {
  keyFacts: string[];
  differentialConsiderations: string[];
  missingData: string[];
};

export type AgentTrace = {
  route: AgentName;
  toolsUsed: string[];
  safetyStatus: SafetyStatus;
  latencyMs: number;
};

export type CaseQuestionResponse = {
  agent: AgentName;
  summary: string;
  clinicalImpression: string;
  recommendedActions: string[];
  rationale: ClinicalRationale;
  safetyFlags: string[];
  trace: AgentTrace;
};
