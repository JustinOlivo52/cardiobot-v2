from app.schemas.case import AgentName, CaseQuestionRequest


def route_request(request: CaseQuestionRequest) -> AgentName:
    text = f"{request.question} {request.case.chief_concern}".lower()

    dosing_terms = ["dose", "dosing", "heparin", "amiodarone", "metoprolol", "nitro"]
    ecg_terms = ["ecg", "ekg", "st elevation", "rhythm", "qrs", "t wave"]

    if any(term in text for term in dosing_terms):
        return AgentName.medication_dosing
    if any(term in text for term in ecg_terms):
        return AgentName.ecg_review
    return AgentName.cardiology_consult
