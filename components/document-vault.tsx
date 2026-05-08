"use client";

import { FormEvent, useState } from "react";

type DocumentVaultProps = {
  listingTitle: string;
  isAuthenticated?: boolean;
};

const requiredDocuments = [
  "Factory License",
  "Land Title Deed",
  "Pollution Board NOC",
  "Electricity Bill",
];

function LockIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 text-slate-500"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export function DocumentVault({
  listingTitle,
  isAuthenticated = false,
}: DocumentVaultProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRequestAccess = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <>
      <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-sm font-semibold text-slate-900">Document Vault</h4>
          {!isAuthenticated ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-600">
              <LockIcon />
              Restricted
            </span>
          ) : null}
        </div>

        <ul className="space-y-2">
          {requiredDocuments.map((documentName) => (
            <li
              key={documentName}
              className="flex items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
            >
              <span className="font-medium text-slate-700">{documentName}</span>
              {isAuthenticated ? (
                <span className="text-xs font-semibold text-emerald-700">
                  Available
                </span>
              ) : (
                <LockIcon />
              )}
            </li>
          ))}
        </ul>

        {!isAuthenticated ? (
          <button
            type="button"
            onClick={() => {
              setIsSubmitted(false);
              setIsModalOpen(true);
            }}
            className="mt-4 inline-flex h-10 items-center justify-center rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Request Access
          </button>
        ) : null}
      </div>

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4">
              <h4 className="text-xl font-semibold text-slate-900">
                Request Document Access
              </h4>
              <p className="mt-1 text-sm text-slate-600">
                Share your details to unlock the Document Vault for{" "}
                <span className="font-medium text-slate-800">{listingTitle}</span>.
              </p>
            </div>

            {isSubmitted ? (
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                Access request submitted. Our team will verify your buyer profile
                and contact you shortly.
              </div>
            ) : (
              <form className="space-y-3" onSubmit={handleRequestAccess}>
                <input
                  required
                  type="text"
                  name="fullName"
                  placeholder="Full name"
                  className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none ring-blue-500 focus:ring-2"
                />
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="Work email"
                  className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none ring-blue-500 focus:ring-2"
                />
                <input
                  required
                  type="text"
                  name="companyName"
                  placeholder="Company name"
                  className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none ring-blue-500 focus:ring-2"
                />
                <input
                  required
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone number"
                  className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none ring-blue-500 focus:ring-2"
                />
                <textarea
                  name="requirements"
                  placeholder="Tell us your acquisition requirements (optional)"
                  rows={3}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-2"
                />
                <button
                  type="submit"
                  className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Submit Request
                </button>
              </form>
            )}

            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-lg border border-slate-300 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
