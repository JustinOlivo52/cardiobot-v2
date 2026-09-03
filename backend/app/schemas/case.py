from enum import StrEnum

from pydantic import BaseModel, Field


class CareSetting(StrEnum):
    ed = "ED"
    icu = "ICU"
    clinic = "Clinic"
    ems = "EMS"


class Sex(StrEnum):
    male = "M"
    female = "F"
    other = "Other"
    unknown = "Unknown"


class CaseContext(BaseModel):
    case_id: str = Field(examples=["DEMO-1042"])
    age: int | None = Field(default=None, ge=0, le=120)
    sex: Sex = Sex.unknown
    weight_kg: float | None = Field(default=None, gt=0, le=300)
    setting: CareSetting = CareSetting.ed
    chief_concern: str
    allergies: str | None = None


class CaseQuestionRequest(BaseModel):
    case: CaseContext
    question: str = Field(min_length=3)


class SafetyStatus(StrEnum):
    passed = "passed"
    review_required = "review_required"
    blocked = "blocked"


class AgentName(StrEnum):
    cardiology_consult = "cardiology_consult"
    ecg_review = "ecg_review"
    medication_dosing = "medication_dosing"


class ClinicalRationale(BaseModel):
    key_facts: list[str]
    differential_considerations: list[str]
    missing_data: list[str]


class AgentTrace(BaseModel):
    route: AgentName
    tools_used: list[str]
    safety_status: SafetyStatus


class CaseQuestionResponse(BaseModel):
    agent: AgentName
    summary: str
    clinical_impression: str
    recommended_actions: list[str]
    rationale: ClinicalRationale
    safety_flags: list[str]
    trace: AgentTrace
