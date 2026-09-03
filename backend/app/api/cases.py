from fastapi import APIRouter

from app.agents.orchestrator import run_case_question
from app.schemas.case import CaseQuestionRequest, CaseQuestionResponse

router = APIRouter(tags=["cases"])


@router.post("/cases/question", response_model=CaseQuestionResponse)
def ask_case_question(request: CaseQuestionRequest) -> CaseQuestionResponse:
    return run_case_question(request)
