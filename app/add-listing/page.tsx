"use client";

import { useState } from "react";

type IdentityType = "Owner" | "Bank" | "Channel Partner";

type AddListingFormState = {
  identity: IdentityType | "";
  powerLoadKva: string;
  ceilingHeightFt: string;
  craneAvailability: "Yes" | "No" | "";
  inNcltOrLiquidation: "Yes" | "No" | "";
  clearTitle: "Yes" | "No" | "";
};

type StepKey = "identity" | "technicalSpecs" | "legalStatus";

const steps: { key: StepKey; label: string }[] = [
  { key: "identity", label: "Identity" },
  { key: "technicalSpecs", label: "Technical Specs" },
  { key: "legalStatus", label: "Legal Status" },
];

const initialState: AddListingFormState = {
  identity: "",
  powerLoadKva: "",
  ceilingHeightFt: "",
  craneAvailability: "",
  inNcltOrLiquidation: "",
  clearTitle: "",
};

export default function AddListingPage() {
  const [activeStep, setActiveStep] = useState<StepKey>("identity");
  const [formData, setFormData] = useState<AddListingFormState>(initialState);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const activeStepIndex = steps.findIndex((step) => step.key === activeStep);
  const isFirstStep = activeStepIndex === 0;
  const isLastStep = activeStepIndex === steps.length - 1;

  const goToNext = () => {
    if (isLastStep) return;
    setActiveStep(steps[activeStepIndex + 1].key);
  };

  const goToPrevious = () => {
    if (isFirstStep) return;
    setActiveStep(steps[activeStepIndex - 1].key);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto w-full max-w-4xl px-6 py-10 md:px-10">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Add Listing
          </h1>
          <p className="text-slate-600">
            Complete each step to submit your industrial property listing.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div
            role="tablist"
            aria-label="Add listing steps"
            className="mb-8 grid gap-2 sm:grid-cols-3"
          >
            {steps.map((step, index) => {
              const isActive = step.key === activeStep;
              const isCompleted = index < activeStepIndex;

              return (
                <button
                  key={step.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveStep(step.key)}
                  className={`rounded-xl border px-4 py-3 text-left transition ${
                    isActive
                      ? "border-blue-600 bg-blue-50 text-blue-800"
                      : isCompleted
                        ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                        : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide">
                    Step {index + 1}
                  </p>
                  <p className="mt-1 text-sm font-semibold">{step.label}</p>
                </button>
              );
            })}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {activeStep === "identity" ? (
              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-slate-900">
                  Step 1: Identity
                </h2>
                <p className="text-sm text-slate-600">
                  Select your role in this listing.
                </p>
                <div className="grid gap-2 sm:grid-cols-3">
                  {(["Owner", "Bank", "Channel Partner"] as IdentityType[]).map((role) => (
                    <label
                      key={role}
                      className={`cursor-pointer rounded-lg border px-3 py-3 text-sm font-medium transition ${
                        formData.identity === role
                          ? "border-blue-600 bg-blue-50 text-blue-800"
                          : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name="identity"
                        value={role}
                        checked={formData.identity === role}
                        onChange={() =>
                          setFormData((current) => ({ ...current, identity: role }))
                        }
                        className="sr-only"
                      />
                      {role}
                    </label>
                  ))}
                </div>
              </section>
            ) : null}

            {activeStep === "technicalSpecs" ? (
              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-slate-900">
                  Step 2: Technical Specs
                </h2>
                <p className="text-sm text-slate-600">
                  Provide infrastructure and equipment details.
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    type="number"
                    placeholder="Power Load (KVA)"
                    value={formData.powerLoadKva}
                    onChange={(event) =>
                      setFormData((current) => ({
                        ...current,
                        powerLoadKva: event.target.value,
                      }))
                    }
                    className="h-11 rounded-lg border border-slate-300 px-3 text-sm outline-none ring-blue-500 focus:ring-2"
                  />
                  <input
                    type="number"
                    placeholder="Ceiling Height (ft)"
                    value={formData.ceilingHeightFt}
                    onChange={(event) =>
                      setFormData((current) => ({
                        ...current,
                        ceilingHeightFt: event.target.value,
                      }))
                    }
                    className="h-11 rounded-lg border border-slate-300 px-3 text-sm outline-none ring-blue-500 focus:ring-2"
                  />
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium text-slate-700">
                    Crane availability
                  </p>
                  <div className="flex gap-2">
                    {(["Yes", "No"] as const).map((value) => (
                      <label
                        key={value}
                        className={`cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium transition ${
                          formData.craneAvailability === value
                            ? "border-blue-600 bg-blue-50 text-blue-800"
                            : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                        }`}
                      >
                        <input
                          type="radio"
                          name="craneAvailability"
                          checked={formData.craneAvailability === value}
                          onChange={() =>
                            setFormData((current) => ({
                              ...current,
                              craneAvailability: value,
                            }))
                          }
                          className="sr-only"
                        />
                        {value}
                      </label>
                    ))}
                  </div>
                </div>
              </section>
            ) : null}

            {activeStep === "legalStatus" ? (
              <section className="space-y-4">
                <h2 className="text-lg font-semibold text-slate-900">
                  Step 3: Legal Status
                </h2>
                <p className="text-sm text-slate-600">
                  Share legal readiness for buyer confidence.
                </p>

                <div>
                  <p className="mb-2 text-sm font-medium text-slate-700">
                    Is the property under NCLT or liquidation?
                  </p>
                  <div className="flex gap-2">
                    {(["Yes", "No"] as const).map((value) => (
                      <label
                        key={value}
                        className={`cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium transition ${
                          formData.inNcltOrLiquidation === value
                            ? "border-blue-600 bg-blue-50 text-blue-800"
                            : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                        }`}
                      >
                        <input
                          type="radio"
                          name="ncltStatus"
                          checked={formData.inNcltOrLiquidation === value}
                          onChange={() =>
                            setFormData((current) => ({
                              ...current,
                              inNcltOrLiquidation: value,
                            }))
                          }
                          className="sr-only"
                        />
                        {value}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium text-slate-700">
                    Does the property have a clear title?
                  </p>
                  <div className="flex gap-2">
                    {(["Yes", "No"] as const).map((value) => (
                      <label
                        key={value}
                        className={`cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium transition ${
                          formData.clearTitle === value
                            ? "border-blue-600 bg-blue-50 text-blue-800"
                            : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                        }`}
                      >
                        <input
                          type="radio"
                          name="clearTitle"
                          checked={formData.clearTitle === value}
                          onChange={() =>
                            setFormData((current) => ({
                              ...current,
                              clearTitle: value,
                            }))
                          }
                          className="sr-only"
                        />
                        {value}
                      </label>
                    ))}
                  </div>
                </div>
              </section>
            ) : null}

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5">
              <button
                type="button"
                onClick={goToPrevious}
                disabled={isFirstStep}
                className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-300 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>

              <div className="flex gap-2">
                {!isLastStep ? (
                  <button
                    type="button"
                    onClick={goToNext}
                    className="inline-flex h-10 items-center justify-center rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex h-10 items-center justify-center rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Submit Listing
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        {isSubmitted ? (
          <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
            Listing details saved. Our team will review and publish after verification.
          </div>
        ) : null}
      </main>
    </div>
  );
}
