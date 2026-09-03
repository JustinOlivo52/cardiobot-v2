from app.schemas.case import AgentName, CaseQuestionRequest, CaseQuestionResponse, ClinicalRationale


def run_ecg_review(request: CaseQuestionRequest) -> CaseQuestionResponse:
    return CaseQuestionResponse(
        agent=AgentName.ecg_review,
        summary="ECG review request detected.",
        clinical_impression="ECG interpretation requires an uploaded tracing or structured ECG findings.",
        recommended_actions=[
            "Upload the ECG image or enter structured findings.",
            "Review rate, rhythm, axis, intervals, QRS morphology, ST segments, and T waves.",
            "Escalate immediately for STEMI pattern, unstable rhythm, or concerning dynamic changes.",
        ],
        rationale=ClinicalRationale(
            key_facts=[
                f"Chief concern is {request.case.chief_concern}.",
                "No ECG image is attached in this starter endpoint.",
            ],
            differential_considerations=[
                "STEMI or occlusion MI pattern",
                "NSTEMI or ischemic changes",
                "Arrhythmia",
                "Conduction abnormality",
            ],
            missing_data=["ECG image or structured ECG measurements"],
        ),
        safety_flags=[
            "AI ECG interpretation must be reviewed by a qualified clinician.",
            "Unstable rhythm or STEMI concern requires immediate escalation.",
        ],
        trace={
            "route": AgentName.ecg_review,
            "tools_used": ["ecg_request_detector", "safety_reviewer"],
            "safety_status": "review_required",
        },
    )
