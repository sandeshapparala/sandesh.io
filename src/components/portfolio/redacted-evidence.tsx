export function RedactedEvidence() {
  const approvedResults = [
    { value: "500+", label: "conversations" },
    { value: "30+", label: "site visits" },
    { value: "5", label: "villas sold" },
  ] as const;

  return (
    <figure className="border border-white/12 bg-white/[0.035] p-5 sm:p-7">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <p className="text-sm font-semibold text-paper">
            Public evidence boundary
          </p>
          <p className="mt-1 text-xs text-paper/65">
            Approved aggregate outcomes only
          </p>
        </div>
        <span className="inline-flex items-center gap-2 text-xs font-medium text-paper/70">
          <span className="size-2 rounded-full bg-verify" aria-hidden="true" />
          Public
        </span>
      </div>
      <div className="grid gap-px bg-white/12 py-px sm:grid-cols-3">
        {approvedResults.map((result) => (
          <div key={result.label} className="bg-ink-deep px-4 py-7">
            <strong className="block font-mono text-2xl font-medium tabular-nums text-paper">
              {result.value}
            </strong>
            <span className="mt-2 block text-xs text-paper/70">
              {result.label}
            </span>
          </div>
        ))}
      </div>
      <figcaption className="border-t border-white/10 pt-4 text-xs leading-5 text-paper/65">
        Only the verified aggregate result is published here. No buyer
        transcript, phone number, name, or commercial detail is represented.
      </figcaption>
    </figure>
  );
}
