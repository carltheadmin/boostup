export default function TermsPage() {
  return (
    <div className="mx-auto max-w-[800px] px-6 py-16">
      <h1 className="text-3xl font-black">Terms of Service</h1>
      <p className="mt-2 text-sm text-white/40">Effective 2026</p>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-white/70">
        <p>By ordering from BoostUp PH, you agree to these terms.</p>
        <h3 className="font-bold text-white">1. Payment First</h3><p>All orders require upfront GCash/PayMaya payment to 09325361831. Upload clear receipt (JPG/PNG/PDF). Fake/edited receipts = instant rejection.</p>
        <h3 className="font-bold text-white">2. Manual Verification</h3><p>We manually verify every payment (1-3h). Only after confirmation do we process.</p>
        <h3 className="font-bold text-white">3. Delivery</h3><p>12-48h typical, up to 72h for large orders. Gradual delivery for safety.</p>
        <h3 className="font-bold text-white">4. No Refund After Processing</h3><p>If boosting started, no refund. If we can't deliver, full refund or replacement.</p>
        <h3 className="font-bold text-white">5. Customer Responsibility</h3><p>Provide correct FB link, keep profile public during delivery.</p>
      </div>
    </div>
  );
}
