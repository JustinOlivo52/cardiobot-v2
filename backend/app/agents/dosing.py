from app.schemas.case import AgentName, CaseQuestionRequest, CaseQuestionResponse, ClinicalRationale


def run_medication_dosing(request: CaseQuestionRequest) -> CaseQuestionResponse:
    weight = request.case.weight_kg
    missing_data = ["renal function", "active bleeding status", "current anticoagulants"]
    if weight is None:
        missing_data.insert(0, "patient weight")

    return CaseQuestionResponse(
        agent=AgentName.medication_dosing,
        summary="Medication dosing requires deterministic calculation and contraindication review.",
        clinical_impression=(
            "A dosing request was detected. Numeric dosing should come from deterministic, "
            "validated drug tables, not free-form model generation."
        ),
        recommended_actions=[
            "Confirm exact medication, indication, weight, renal function, and contraindications.",
            "Use institutional protocol and pharmacy verification for high-alert cardiac medications.",
            "Do not administer if required dosing inputs are missing.",
        ],
        rationale=ClinicalRationale(
            key_facts=[
                f"Recorded weight is {weight} kg." if weight else "No patient weight was provided.",
                f"Allergies are {request.case.allergies or 'unknown'}.",
            ],
            differential_considerations=[
                "ACS anticoagulation",
                "Rate or rhythm control",
                "Vasodilator therapy",
            ],
            missing_data=missing_data,
        ),
        safety_flags=[
            "High-alert medication workflow requires human verification.",
            "Dose ceilings and contraindications must be enforced by deterministic tools.",
        ],
        trace={
            "route": AgentName.medication_dosing,
            "tools_used": ["drug_intent_detector", "safety_reviewer"],
            "safety_status": "review_required",
        },
    )
