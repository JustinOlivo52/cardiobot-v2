from app.schemas.case import AgentName, CaseQuestionRequest, CaseQuestionResponse, ClinicalRationale


def run_cardiology_consult(request: CaseQuestionRequest) -> CaseQuestionResponse:
    case = request.case
    missing_data = [
        "12-lead ECG",
        "high-sensitivity troponin trend",
        "vital signs trend",
        "current medications",
        "cardiac risk factors",
    ]

    return CaseQuestionResponse(
        agent=AgentName.cardiology_consult,
        summary="Chest pain presentation requires urgent ACS evaluation.",
        clinical_impression=(
            "Acute coronary syndrome should remain high on the differential until ECG, "
            "troponin trend, and vital signs are reviewed."
        ),
        recommended_actions=[
            "Obtain a 12-lead ECG and repeat if symptoms persist or initial ECG is non-diagnostic.",
            "Draw high-sensitivity troponin now and repeat per local protocol.",
            "Assess hemodynamic stability, oxygenation, bleeding risk, and medication contraindications.",
            "Use guideline-directed ACS therapy only after contraindications are reviewed.",
        ],
        rationale=ClinicalRationale(
            key_facts=[
                f"Care setting is {case.setting}.",
                f"Chief concern is {case.chief_concern}.",
                f"Age is {case.age if case.age is not None else 'unknown'}.",
            ],
            differential_considerations=[
                "Acute coronary syndrome",
                "Aortic dissection",
                "Pulmonary embolism",
                "Pericarditis or myocarditis",
                "Non-cardiac chest pain",
            ],
            missing_data=missing_data,
        ),
        safety_flags=[
            "Escalate immediately for hypotension, dynamic ECG changes, ongoing ischemic pain, or instability.",
            "Verify allergies and bleeding risk before antiplatelet or anticoagulant therapy.",
        ],
        trace={
            "route": AgentName.cardiology_consult,
            "tools_used": ["case_context_parser", "safety_reviewer"],
            "safety_status": "review_required",
        },
    )
