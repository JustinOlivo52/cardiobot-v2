from app.agents.orchestrator import run_case_question
from app.schemas.case import CaseContext, CaseQuestionRequest


def test_routes_chest_pain_to_consult_agent():
    request = CaseQuestionRequest(
        case=CaseContext(
            case_id="DEMO-1042",
            age=64,
            sex="M",
            weight_kg=92,
            setting="ED",
            chief_concern="chest pain",
        ),
        question="What is the most likely diagnosis and immediate next step?",
    )

    response = run_case_question(request)

    assert response.agent == "cardiology_consult"
    assert response.rationale.missing_data
    assert response.trace.safety_status == "review_required"


def test_routes_heparin_question_to_dosing_agent():
    request = CaseQuestionRequest(
        case=CaseContext(
            case_id="DEMO-1043",
            age=70,
            sex="F",
            weight_kg=78,
            setting="ED",
            chief_concern="NSTEMI",
        ),
        question="What is the heparin dose?",
    )

    response = run_case_question(request)

    assert response.agent == "medication_dosing"
    assert "deterministic" in response.clinical_impression.lower()
