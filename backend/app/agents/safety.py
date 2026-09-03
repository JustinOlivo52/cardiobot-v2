from app.schemas.case import CaseQuestionResponse, SafetyStatus


def review_response(response: CaseQuestionResponse) -> CaseQuestionResponse:
    if response.safety_flags:
        response.trace.safety_status = SafetyStatus.review_required
    return response
