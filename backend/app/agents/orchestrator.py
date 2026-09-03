from app.agents.consult import run_cardiology_consult
from app.agents.dosing import run_medication_dosing
from app.agents.ecg import run_ecg_review
from app.agents.router import route_request
from app.agents.safety import review_response
from app.schemas.case import AgentName, CaseQuestionRequest, CaseQuestionResponse


def run_case_question(request: CaseQuestionRequest) -> CaseQuestionResponse:
    route = route_request(request)

    if route == AgentName.medication_dosing:
        response = run_medication_dosing(request)
    elif route == AgentName.ecg_review:
        response = run_ecg_review(request)
    else:
        response = run_cardiology_consult(request)

    return review_response(response)
